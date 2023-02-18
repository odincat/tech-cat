import { createContext } from '@server/trpc';
import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@server/routers/root';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export type AppRouter = typeof appRouter;
export type AppRouterInput = inferRouterInputs<AppRouter>;
export type AppRouterOutput = inferRouterOutputs<AppRouter>;

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
});
