import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@backend/routers/root';
import { createContext } from '@backend/utils/context';
import { withSessionRoute } from '@lib/auth/sessions';

// export type definition of API
export type AppRouter = typeof appRouter;

const trpcHandler = trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
});

export default withSessionRoute((req, res) => {
    trpcHandler(req, res);
});
