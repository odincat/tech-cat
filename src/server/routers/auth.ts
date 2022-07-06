import { createRouter } from "@backend/utils/createRouter";
import { db } from "@backend/utils/db-client";
import { sendEmail } from "@backend/utils/email";
import { authenticateUserWithEmail, hashPassword, verifyPassword } from "@lib/auth/auth";
import { createSession, removeSession } from "@lib/auth/sessions";
import { addDays } from "date-fns";
import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 10;
export const PUBLIC_URL = process.env.PUBLIC_URL || process.env.VERCEL_URL || '';

export const authRouter = createRouter()
    .query('getMe', {
        async resolve({ ctx }) {
            if(!ctx.session?.userId) {
                return null;
            }

            return db.user.findUnique({
                where: { id: ctx.session.userId },
                rejectOnNotFound: true
            });
        }
    })
    .mutation('login', {
        input: z.object({
            email: z.string().email(),
            password: z.string().min(PASSWORD_MIN_LENGTH)
        }),
        async resolve({ input, ctx}) {
            const user = await authenticateUserWithEmail(input.email, input.password);

            await createSession(ctx.ironSession, user);

            return user;
        }
    })
    .mutation('logout', {
        async resolve({ ctx }) {
            await removeSession(ctx.ironSession, ctx.session);
        }
    })
    .mutation('signUp', {
        input: z.object({
            name: z.string().min(1).max(100),
            email: z.string().email(),
            password: z.string().min(PASSWORD_MIN_LENGTH)
        }),
        async resolve({ input, ctx }) {
            const user = await db.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    hashedPassword: await hashPassword(input.password)
                }
            });

            await createSession(ctx.ironSession, user);

            return user;
        }
    })
    .mutation('changePassword', {
        input: z.object({
            currentPassword: z.string().min(PASSWORD_MIN_LENGTH),
            newPassword: z.string().min(PASSWORD_MIN_LENGTH)
        }),
        async resolve({ input, ctx }) {
            const user = await db.user.findUnique({
                where: { id: ctx.session?.userId },
            });

            const isPasswordValid = await verifyPassword(user!.hashedPassword, input.currentPassword);

            if(!isPasswordValid) {
                throw new Error('Current password is invalid');
            }

            await db.user.update({
                where: { id: user!.id },
                data: {
                    hashedPassword: await hashPassword(input.newPassword),
                    sessions: {
                        deleteMany: {
                            id: {
                                not: ctx.session!.id
                            }
                        }
                    }
                }
            });
        }
    })
    .mutation('resetPasswordRequest', {
        input: z.object({ email: z.string().email()}),
        async resolve({ input }) {
            const user = await db.user.findFirst({
                where: {
                    email: input.email
                },
                rejectOnNotFound: true
            });

            const reset = await db.passwordReset.create({
                data: {
                    userId: user.id,
                    expiresAt: addDays(new Date(), 1)
                }
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
                `
            });
        }
    })
    .mutation('fulfillPasswordResetRequest', {
        input: z.object({
            code: z.string(),
            newPassword: z.string().min(PASSWORD_MIN_LENGTH)
        }),
        async resolve({ input, ctx}) {
            const reset = await db.passwordReset.findFirst({
                where: {
                    id: input.code
                },
                rejectOnNotFound: true
            });

            if(reset.expiresAt < new Date()) {
                throw new Error('Password reset code has expired');
            }

            const user = await db.user.update({
                where: {
                    id: reset.userId
                },
                data: {
                    hashedPassword: await hashPassword(input.newPassword),
                    sessions: {
                        deleteMany: {}
                    }
                }
            });

            await createSession(ctx.ironSession, user);
        }
    })
    .mutation('testEmail', {
        async resolve({ ctx }) {
            sendEmail({to: 'webtypecat@outlook.com', subject: 'Test Mail', content: 'Hi there!'});
        }
    })