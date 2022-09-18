import { guardedProcedure, t } from "@server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const categoryRouter = t.router({
    create: guardedProcedure.meta({ requiredRole: 'AUTHOR' }).input(z.object({
        name: z.string(),
        slug: z.string()
    })).mutation(async ({ ctx, input }) => {
        const category = await ctx.db.category.create({
            data: {
                name: input.name,
                slug: input.slug
            }
        }).catch((reason) => {
            throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Unable to create category: ${reason}`})
        })
    })
});