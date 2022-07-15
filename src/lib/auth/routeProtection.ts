import { GetServerSidePropsContext } from 'next';
import { resolveSession } from './sessions';

export const unauthenticatedRoute = async (
    context: GetServerSidePropsContext,
    redirect: string = '/',
) => {
    const { session } = await resolveSession(context.req, context.res);

    if (session) {
        return {
            redirect: {
                destination: redirect,
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export const authenticatedRoute = async (
    context: GetServerSidePropsContext,
    redirect: string = '/facility',
) => {
    const { session } = await resolveSession(context.req, context.res);

    if (!session) {
        return {
            redirect: {
                destination: `${redirect}?redirect=${encodeURIComponent(
                    context.resolvedUrl,
                )}`,
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
