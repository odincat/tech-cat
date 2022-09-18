import { shortlinkRouter } from './linkShortener';
import { authRouter } from './auth';
import { userRouter } from './user';
import { t } from '@server/trpc';
import { postRouter } from './post';

export const appRouter = t.router({
    auth: authRouter,
    user: userRouter,
    shortlink: shortlinkRouter,
    post: postRouter
});