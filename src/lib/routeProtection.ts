import { Role } from "@prisma/client";
import { db } from "@server/utils/db-client";
import { GetServerSidePropsContext } from "next"
import { resolveSession } from "./auth/sessions"
import { isPermitted } from "./utils";

export const protectedRoute = async (ctx: GetServerSidePropsContext, requiredRole: Role, redirect?: string, returnEmptyProps: boolean = true) => {
    const { session } = await resolveSession(ctx.req, ctx.res);

    if (!session) return {
        redirect: {
            destination: redirect ? redirect : `/auth/login?redirect=${encodeURIComponent(ctx.resolvedUrl)}`,
            permanent: false
        }
    };

    const user = db.user.findUniqueOrThrow({
        where: {
            id: session.userId
        }
    });

    const isAllowedToEnter = isPermitted(requiredRole, (await user).role);

    if(!isAllowedToEnter) return {
        redirect: {
            destination: `/not-allowed?permission=${requiredRole.toLowerCase()}`,
            permanent: false
        }
    }

    if(returnEmptyProps) return {
        props: {},
        user,
        session
    };
}