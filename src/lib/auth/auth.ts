import crypto from 'crypto';
import { bcrypt, bcryptVerify } from 'hash-wasm';
import { db } from '@server/utils/db-client';
import { T_FormatError, T_ValidationError } from '@server/utils/error';

const PASSWORD_COST_FACTOR = 11;

export const hashPassword = async (password: string) => {
    const salt = crypto.randomBytes(16);

    const key = await bcrypt({
        password,
        salt,
        costFactor: PASSWORD_COST_FACTOR,
        outputType: 'encoded',
    });

    return key;
};

export const verifyPassword = async (
    hashedPassword: string,
    password: string,
): Promise<boolean> => {
    return bcryptVerify({
        password,
        hash: hashedPassword,
    });
};

export const authenticateUserWithEmail = async (
    email: string,
    password: string,
) => {
    const user = await db.user.findFirst({
        where: {
            email: {
                equals: email,
            },
        },
    });

    if (!user || !user.hashedPassword) {
        throw new T_ValidationError('User not found', {
            email: 'Email not found',
        });
    }

    if (!(await verifyPassword(user.hashedPassword, password))) {
        throw new T_ValidationError('Invalid password', {
            password: 'Password is incorrect',
        });
    }

    const [_algo, costFactorString] = user.hashedPassword.split('$');

    if (!costFactorString) {
        throw new T_FormatError('Unknown password format :/');
    }

    const costFactor = parseInt(costFactorString, 10);
    if (costFactor !== PASSWORD_COST_FACTOR) {
        const improvedHashedPassword = await hashPassword(password);
        await db.user.update({
            where: { id: user.id },
            data: { hashedPassword: improvedHashedPassword },
        });
    }

    await db.passwordReset.deleteMany({
        where: {
            userId: user.id,
        },
    });

    return user;
};
