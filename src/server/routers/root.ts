import { shortlinkRouter } from './linkShortener';
import { authRouter } from './auth';
import { userRouter } from './user';
import { t } from '@server/trpc';
import { postRouter } from './post';
import { spotifyRouter } from './spotify';

export const appRouter = t.router({
    auth: authRouter,
    user: userRouter,
    shortlink: shortlinkRouter,
    post: postRouter,
    spotify: spotifyRouter
});