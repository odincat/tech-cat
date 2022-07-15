import superjson from 'superjson';
import { createRouter } from '@backend/utils/createRouter';
import { linkShortenerRouter } from './linkShortener';
import { authRouter } from './auth';
import { userRouter } from './user';

export const appRouter = createRouter()
    .transformer(superjson)
    .merge('auth.', authRouter)
    .merge('user.', userRouter)
    .merge('linkShortener.', linkShortenerRouter);
