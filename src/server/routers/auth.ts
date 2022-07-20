import { createRouter } from '@server/utils/createRouter';
import { db } from '@server/utils/db-client';
import { sendEmail } from '@server/utils/email';
import { T_ValidationError } from '@server/utils/error';
import {
    authenticateUserWithEmail,
    hashPassword,
    verifyPassword,
} from '@lib/auth/auth';
import { createSession, removeSession } from '@lib/auth/sessions';
import {
    ENABLE_EMAIL_VERIFICATION,
    sendVerificationEmail,
    verifyEmailToken,
} from '@lib/auth/verification';
import { addDays } from 'date-fns';
import { z } from 'zod';

export const PASSWORD_MIN_LENGTH = 10;
export const PUBLIC_URL =
    process.env.PUBLIC_URL || process.env.VERCEL_URL || '';

export const authRouter = createRouter()
    .query('getMe', {
        async resolve({ ctx }) {
            if (!ctx.session?.userId) {
                return null;
            }

            return db.user.findUniqueOrThrow({
                where: { id: ctx.session.userId }
            });
        },
    })
    .mutation('login', {
        input: z.object({
            email: z.string().email(),
            password: z.string().min(PASSWORD_MIN_LENGTH),
            userAgent: z.string()
        }),
        async resolve({ input, ctx }) {
            const user = await authenticateUserWithEmail(
                input.email,
                input.password,
            );

            if (ENABLE_EMAIL_VERIFICATION) {
                if (user.emailVerified) {
                    await createSession(ctx.ironSession, user, input.userAgent);
                } else {
                    await sendVerificationEmail(user);
                }
            } else {
                await createSession(ctx.ironSession, user, input.userAgent);
            }

            return user;
        },
    })
    .mutation('signOut', {
        async resolve({ ctx }) {
            await removeSession(ctx.ironSession, ctx.session);
        },
    })
    .mutation('register', {
        input: z.object({
            name: z.string().min(1).max(100),
            email: z.string().email(),
            password: z.string().min(PASSWORD_MIN_LENGTH),
            userAgent: z.string()
        }),
        async resolve({ input, ctx }) {
            const user = await db.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    hashedPassword: await hashPassword(input.password),
                },
            });

            if (ENABLE_EMAIL_VERIFICATION) {
                await sendVerificationEmail(user);
            } else {
                await createSession(ctx.ironSession, user, input.userAgent);
            }

            return user;
        },
    })
    .mutation('changePassword', {
        input: z.object({
            currentPassword: z.string().min(PASSWORD_MIN_LENGTH),
            newPassword: z.string().min(PASSWORD_MIN_LENGTH),
        }),
        async resolve({ input, ctx }) {
            const user = await db.user.findUnique({
                where: { id: ctx.session?.userId },
            });

            const isPasswordValid = await verifyPassword(
                user!.hashedPassword,
                input.currentPassword,
            );

            if (!isPasswordValid) {
                throw new T_ValidationError('Password is invalid', { password: 'password invalid' });
            }

            await db.user.update({
                where: { id: user!.id },
                data: {
                    hashedPassword: await hashPassword(input.newPassword),
                    sessions: {
                        deleteMany: {
                            id: {
                                not: ctx.session!.id,
                            },
                        },
                    },
                },
            });
        },
    })
    .mutation('resetPasswordRequest', {
        input: z.object({ email: z.string().email() }),
        async resolve({ input }) {
            const user = await db.user.findFirstOrThrow({
                where: {
                    email: input.email,
                }
            });

            const reset = await db.passwordReset.create({
                data: {
                    userId: user.id,
                    expiresAt: addDays(new Date(), 1),
                },
            });

            await sendEmail({
                to: user.email,
                subject: 'TechCat Headquarters - Password reset',
                content: `
                    <h1>Password reset</h1>
                    <p>
                    Hi there ${user.name},
                    a password reset has been requested for your account.
                    To complete the reset please follow <a href="${PUBLIC_URL}/auth/reset?code=${reset.id}">this link</a>.
                    If you did not request a password renewal, please ignore this email.

                    Cheers!
                    TechCat Headquarters
                    </p>
                `,
            });
        },
    })
    .mutation('fulfillPasswordResetRequest', {
        input: z.object({
            code: z.string(),
            newPassword: z.string().min(PASSWORD_MIN_LENGTH),
            userAgent: z.string()
        }),
        async resolve({ input, ctx }) {
            const reset = await db.passwordReset.findFirstOrThrow({
                where: {
                    id: input.code,
                }
            });

            if (reset.expiresAt < new Date()) {
                throw new Error('Password reset code has expired');
            }

            const user = await db.user.update({
                where: {
                    id: reset.userId,
                },
                data: {
                    hashedPassword: await hashPassword(input.newPassword),
                    sessions: {
                        deleteMany: {},
                    },
                },
            });

            await createSession(ctx.ironSession, user, input.userAgent);
        },
    })
    .mutation('verifyEmail', {
        input: z.object({
            code: z.string(),
            userAgent: z.string()
        }),

        async resolve({ input, ctx }) {
            const user = await verifyEmailToken(input.code);

            return await createSession(ctx.ironSession, user, input.userAgent);
        },
    });
