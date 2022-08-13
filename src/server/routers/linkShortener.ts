import { createRouter } from '@server/utils/createRouter';
import { z } from 'zod';
import { db } from '@server/utils/db-client';

export const linkShortenerRouter = createRouter().query('getRedirect', {
    input: z.object({ slug: z.string() }),

    async resolve({ input }) {
        const data = await db.shortLink.findFirst({
            where: {
                slug: {
                    equals: input.slug,
                },
            },
        });

        if (!data) {
            throw new Error('Slug not found');
        }

        return data;
    },
})
.query('test', {
    meta: {
        requiredRole: 'USER'
    },
    async resolve({ctx}) {
        console.log(ctx.session?.userId);
        return ctx.session?.userId;
    }
});
