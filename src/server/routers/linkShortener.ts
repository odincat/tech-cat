import { z } from 'zod';
import { guardedProcedure, t } from '@server/trpc';
import { TRPCError } from '@trpc/server';

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
});