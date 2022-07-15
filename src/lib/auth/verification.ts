import { db } from '@backend/utils/db-client';
import { sendEmail } from '@backend/utils/email';
import { T_ServerError } from '@backend/utils/error';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const ENABLE_EMAIL_VERIFICATION =
    process.env.ENABLE_EMAIL_VERIFICATION === 'true';
const JWT_SECRET = process.env.JWT_SECRET || '';
const PUBLIC_URL = process.env.PUBLIC_URL || process.env.VERCEL_URL || '';

if (!JWT_SECRET)
    console.warn(
        '[TechCat ENV Police] JWT Secret is not set. This can cause production errors.',
    );
if (!PUBLIC_URL)
    console.warn(
        '[TechCat ENV Police] Public URL is not set. This can cause production errors.',
    );

interface VerificationPayload {
    userId: string;
    email: string;
}

export const sendVerificationEmail = async (user: User) => {
    const verificationToken = generateEmailToken(user);
    await sendEmail({
        to: user.email,
        subject: 'TechCat - Verify your email to get started',
        content: `
            Hi ${user.name},

            in order to get started on TechCat, please verify your email address by clicking the link below:
            <a href="${PUBLIC_URL}/auth/verify?code=${verificationToken}">Verify email</a>

            If you didn't sign up, just ignore this mail.

            Cheers!
            TechCat Headquarters
        `,
    });
};

export const generateEmailToken = (user: User) => {
    const payload: VerificationPayload = {
        userId: user.id,
        email: user.email,
    };

    return Buffer.from(
        jwt.sign(payload, JWT_SECRET, { expiresIn: '2 days' }),
    ).toString('base64url');
};

export const verifyEmailToken = async (token: string) => {
    const payload = jwt.verify(
        Buffer.from(token, 'base64url').toString('utf8'),
        JWT_SECRET,
    ) as VerificationPayload;

    const user = await db.user.findFirstOrThrow({
        where: {
            id: payload.userId,
            email: payload.email,
        }
    });

    if (user.emailVerified) throw new T_ServerError('Email already verified');

    return await db.user.update({
        where: {
            id: user.id,
        },
        data: {
            emailVerified: true,
        },
    });
};
