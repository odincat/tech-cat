import { Post } from "@prisma/client";
import { guardedProcedure, t } from "@server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { categoryRouter } from "./category";
import { commentRouter } from "./comment";

export const postRouter = t.router({
    comment: commentRouter,
    category: categoryRouter,
    getBySlug: guardedProcedure.input(z.object({
        slug: z.string()
    })).query(async ({ ctx, input }) => {
        const post = await ctx.db.post.findUnique({
            where: {
                slug: input.slug
            },
            include: {
                category: true,
            }
        });

        if(!post) throw new TRPCError({ code: 'NOT_FOUND', message: 'Post not found' });
        if(!post.published && ctx.session?.userId !== post.userId) throw new TRPCError({ code: 'NOT_FOUND', message: 'Post not found' });

        return post;
    }),
    feed: guardedProcedure.input(z.object({
        amount: z.number().optional().default(5),
        offset: z.number().optional().default(0)
    })).query(async ({ ctx, input }) => {
        const posts = ctx.db.post.findMany({
            where: {
                published: true
            },
            skip: input.offset,
            take: input.amount,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                category: true
            }
        }).catch((reason) => {
            throw new TRPCError({ code: 'NOT_FOUND', message: `Unable to fetch posts: ${reason}`})
        });

        return posts;
    }),
    create: guardedProcedure.meta({ requiredRole: 'AUTHOR' }).input(z.object({
        title: z.string(),
        slug: z.string()
    })).mutation(async ({ ctx, input }) => {
        if(!ctx.session?.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
        await ctx.db.post.create({
            data: {
                slug: input.slug,
                categorySlug: '',
                userId: ctx.session?.userId,
                title: `New Post (${Date.now()})`,
                content: '',
                exerpt: '',
                thumbnailUrl: ''
            }
        });
    }),
    update: guardedProcedure.meta({ requiredRole: 'AUTHOR' }).input(z.object({
        slug: z.string(),

        title: z.string().optional(),
        content: z.string().optional(),
        newSlug: z.string().optional(),
        exerpt: z.string().optional(),
        thumbnailUrl: z.string().optional(),
        categorySlug: z.string().optional(),
        published: z.boolean().optional()
    })).mutation(async ({ ctx, input }) => {
        const originalPost = await ctx.db.post.findMany({
            where: {
                slug: input.slug,
                AND: {
                    userId: {
                        equals: ctx.session?.userId
                    }
                }
            }
        });

        if(!originalPost[0]) throw new TRPCError({ code: 'NOT_FOUND', message: 'Post not found' });

        return await ctx.db.post.updateMany({
            where: {
                slug: input.slug,
                AND: {
                    userId: {
                        equals: ctx.session?.userId
                    }
                }
            },
            data: {
                title: input.title ?? originalPost[0].title,
                content: input.content ?? originalPost[0].content,
                slug: input.newSlug ?? originalPost[0].slug,
                exerpt: input.exerpt ?? originalPost[0].exerpt,
                thumbnailUrl: input.thumbnailUrl ?? originalPost[0].thumbnailUrl,
                categorySlug: input.categorySlug ?? originalPost[0].categorySlug,
                published: input.published ?? originalPost[0].published
            }
        }).catch((reason) => {
            throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Unable to update post: ${reason}`})
        });
    }),
    delete: guardedProcedure.meta({ requiredRole: 'AUTHOR' }).input(z.object({
        slug: z.string(),
        confirmation: z.string()
    })).mutation(async ({ ctx, input }) => {
        if(input.slug !== input.confirmation) throw new TRPCError({ code: 'FORBIDDEN', message: 'Confirmation field does not match slug' });

        await ctx.db.post.deleteMany({
            where: {
                slug: input.slug,
                AND: {
                    userId: {
                        equals: ctx.session?.userId
                    }
                }
            }
        }).catch((reason) => {
            throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Failed to delete post: ${reason}` })
        });
    }),
    adminDelete: guardedProcedure.meta({ requiredRole: 'ADMIN' }).input(z.object({
        slug: z.string(),
        confirmation: z.string()
    })).mutation(async ({ ctx, input }) => {
        if(input.slug !== input.confirmation) throw new TRPCError({ code: 'FORBIDDEN', message: 'Confirmation field does not match slug' });

        await ctx.db.post.delete({
            where: {
                slug: input.slug
            }
        }).catch((reason) => {
            throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Failed to delete post: ${reason}` })
        });
    })
});