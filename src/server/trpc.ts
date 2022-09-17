import { isPermitted } from '@lib/utils';
import { Role } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import { TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './utils/context';

export const t = initTRPC
    .context<Context>()
    .meta<{ requiredRole: Role }>()
    .create({
        transformer: superjson
    });

const guardMiddleware = t.middleware(async ({ ctx, meta, next }) => {
    if(!meta?.requiredRole) return next();
    if(!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in' });

    const user = await ctx.db.user.findUniqueOrThrow({
        where: {
            id: ctx.session.userId
        }
    });

    if(!isPermitted(meta.requiredRole, user.role)) throw new TRPCError({ code: 'FORBIDDEN', message: 'You do not have permission to access this endpoint' });

    return next();
});
export const guardedProcedure = t.procedure.use(guardMiddleware);
