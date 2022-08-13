import { Context } from './context';
import * as trpc from '@trpc/server';
import { Role } from '@prisma/client';

export interface Meta {
    requiredRole: Role;
}

// Helper function that allows us to create multiple routers and merge them with the same context and nice syntax
export const createRouter = () => {
    return trpc.router<Context, Meta>();
};
