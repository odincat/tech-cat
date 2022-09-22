import { guardedProcedure, t } from "@server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const commentRouter = t.router({
    post: guardedProcedure.meta({ requiredRole: 'USER' }).input(z.object({
        slug: z.string(),
        content: z.string()
    })).mutation(async ({ ctx, input }) => {
        if(!ctx.session?.userId) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You need to be logged in in order to post comments.'});
        await ctx.db.comment.create({
            data: {
                content: input.content,
                postSlug: input.slug,
                userId: ctx.session?.userId
            }
        })
    }),
    delete: guardedProcedure.meta({ requiredRole: 'USER' }).input(z.object({
        slug: z.string(),
        id: z.string()
    })).mutation(async ({ ctx, input }) => {
        await ctx.db.comment.deleteMany({
            where: {
                postSlug: input.slug,
                userId: ctx.session?.userId,
                id: input.id
            }
        }).catch((reason) => {
            throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Unable to delete comment: ${reason}` })
        })
    }),
    adminDelete: guardedProcedure.meta({ requiredRole: 'ADMIN'}).input(z.object({
        slug: z.string(),
        id: z.string()
    })).mutation(async ({ ctx, input }) => {
        await ctx.db.comment.deleteMany({
            where: {
                postSlug: input.slug,
                id: input.id
            }
        }).catch((reason) => {
            throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Unable to delete comment: ${reason}` })
        })
    })
});