import { resolveSession } from '@lib/auth/sessions';
import { isPermitted } from '@lib/utils';
import { Role } from '@prisma/client';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { GetServerSidePropsContext } from 'next';
import superjson from 'superjson';
import * as trpcNext from '@trpc/server/adapters/next';
import { db } from './utils/db-client';

export const t = initTRPC
    .context<Context>()
    .meta<{ requiredRole: Role }>()
    .create({
        transformer: superjson
    });

export const createContext = async ({
    req,
    res,
}: trpcNext.CreateNextContextOptions | GetServerSidePropsContext) => {
    const { ironSession, session } = await resolveSession(req, res);

    return {
        session,
        ironSession,
        db
    };
};

export type Context = inferAsyncReturnType<typeof createContext>;

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

