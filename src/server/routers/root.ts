import superjson from 'superjson';
import { createRouter } from '@server/utils/createRouter';
import { linkShortenerRouter } from './linkShortener';
import { authRouter } from './auth';
import { userRouter } from './user';
import { TRPCError } from '@trpc/server';
import { isPermitted } from '@lib/utils';
import { db } from '@server/utils/db-client';

export const appRouter = createRouter()
    .transformer(superjson)
    .middleware(async ({ ctx, next, meta }) => {
        if(!meta?.requiredRole) return next();
        if(!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in' });

        const user = await db.user.findUniqueOrThrow({
            where: {
                id: ctx.session.userId
            }
        });

        if(!isPermitted(meta.requiredRole, user.role)) throw new TRPCError({ code: 'FORBIDDEN', message: 'You do not have permission to access this endpoint' });

        return next();
    })
    .merge('auth.', authRouter)
    .merge('user.', userRouter)
    .merge('linkShortener.', linkShortenerRouter)
