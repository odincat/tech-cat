import { guardedProcedure, t } from '@server/trpc';
import { createRouter } from '@server/utils/createRouter';
import { db } from '@server/utils/db-client';
import { z } from 'zod';

export const olduserRouter = createRouter().mutation('changeName', {
    input: z.object({ name: z.string().min(1).max(100) }),
    async resolve({ input, ctx }) {
        return db.user.update({
            where: {
                id: ctx.session?.id,
            },
            data: {
                name: input.name ?? 'Glauben Sie, dass ich verrückt bin?',
            },
        });
    },
});

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
    })
});