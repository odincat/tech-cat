import superjson from 'superjson';
import { createRouter } from '@server/utils/createRouter';
import { linkShortenerRouter } from './linkShortener';
import { authRouter } from './auth';
import { userRouter } from './user';
import { isPermitted } from '@lib/utils';
import { TRPCError } from '@trpc/server';

export const appRouter = createRouter()
    .transformer(superjson)
    .merge('auth.', authRouter)
    .merge('user.', userRouter)
    .merge('linkShortener.', linkShortenerRouter)
