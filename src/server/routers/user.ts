import { guardedProcedure, t } from '@server/trpc';
import { z } from 'zod';

export const userRouter = t.router({
    changeName: guardedProcedure.meta({ requiredRole: 'USER' }).input(z.object({
        name: z.string().min(1).max(100)
    })).mutation(async ({ ctx, input }) => {
        return await ctx.db.user.update({
            where: {
                id: ctx.session?.id,
            },
            data: {
                name: input.name ?? 'Glauben Sie, dass ich verrückt bin?',
            }
        });
    }),
    getProfile: guardedProcedure.input(z.object({
        username: z.string()
    })).query(async ({ ctx, input }) => {
        return await ctx.db.user.findUnique({
            where: {
                username: input.username
            },
            select: {
                name: true,
                bio: true,
                username: true,
                photoUrl: true
            }
        });
    })
});