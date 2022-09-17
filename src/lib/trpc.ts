import { createTRPCNext } from "@trpc/next";
import { httpBatchLink, httpLink } from "@trpc/client";
import type { AppRouter } from "@pages/api/trpc/[trpc]";
import superjson from 'superjson';

const getBaseUrl = () => {
    if (typeof window !== 'undefined') return '';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    if (process.env.RENDER_INTERNAL_HOSTNAME) return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
    config() {
        return {
            links: [
                httpBatchLink({ url: `${getBaseUrl()}/api/trpc` }),
                httpLink({ url: `${getBaseUrl()}/api/trpc` })
            ],
            queryClientConfig: {
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false
                    }
                }
            },
            transformer: superjson
        }
    },
    ssr: false 
});