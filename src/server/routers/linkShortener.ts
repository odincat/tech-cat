import { createRouter } from '@server/utils/createRouter';
import { z } from 'zod';
import { db } from '@server/utils/db-client';
import { guardedProcedure, t } from '@server/trpc';
import { TRPCError } from '@trpc/server';

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

export const shortlinkRouter = t.router({
    getRedirect: guardedProcedure.input(z.object({
        slug: z.string()
    })).query(async ({ ctx, input }) => {
        const data = await ctx.db.shortLink.findFirst({
            where: {
                slug: {
                    equals: input.slug,
                },
            },
        });

        if (!data) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Slug not found' })
        }

        return data;
    })
})