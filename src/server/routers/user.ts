import { createRouter } from "@backend/utils/createRouter";
import { db } from "@backend/utils/db-client";
import { z } from "zod";

export const userRouter = createRouter()
    .mutation('changeName', {
        input: z.object({ name: z.string().min(1).max(100) }),
        async resolve({ input, ctx }) {
            return db.user.update({
                where: {
                    id: ctx.session?.id
                },
                data: {
                    name: input.name ?? 'Glauben Sie, dass ich verrückt bin?'
                }
            })
        }
    });