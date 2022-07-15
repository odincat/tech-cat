import { resolveSession } from '@lib/auth/sessions';
import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

export const createContext = async ({
    req,
    res,
}: trpcNext.CreateNextContextOptions) => {
    const { ironSession, session } = await resolveSession(req, res);

    return {
        session,
        ironSession,
    };
};

export type Context = inferAsyncReturnType<typeof createContext>;
