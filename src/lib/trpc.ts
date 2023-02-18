import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@pages/api/trpc/[trpc]";
import superjson from 'superjson';

const getBaseUrl = () => {
    if (typeof window !== 'undefined') return '';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    if (process.env.RENDER_INTERNAL_HOSTNAME) return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
    if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL;
    return `http://localhost:${process.env.PORT ?? 4700}`;
}

export const trpc = createTRPCNext<AppRouter>({
    config({ ctx }) {
        if(typeof window !== 'undefined') {
            return {
                links: [
                    httpBatchLink({ url: `/api/trpc` }),
                ],
                transformer: superjson
            };
        }

        return {
            links: [
                httpBatchLink({ url: `${getBaseUrl()}/api/trpc`, headers() {
                    if (ctx?.req) {
                        const {
                            connection: _connection,
                            ...headers
                        } = ctx.req.headers;
                        return {
                            ...headers,
                            'x-ssr': '1'
                        };
                    }
                    return {};
                }}),
            ],
            transformer: superjson
        };
    },
    ssr: true 
});
