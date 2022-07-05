import { resolveSession } from '@lib/auth/sessions';
import * as trpc from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  const { session, ironSession } = await resolveSession(req, res);

  return {
    session,
    ironSession
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
