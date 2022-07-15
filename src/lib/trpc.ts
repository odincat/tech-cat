import { PUBLIC_URL } from '@backend/routers/auth';
import { createReactQueryHooks, createTRPCClient } from '@trpc/react';
import type { AppRouter } from '../pages/api/trpc/[trpc]';

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}

// export const vanillaTrpc = createTRPCClient<AppRouter>({
//     url: `${PUBLIC_URL}/api/trpc`
// });
