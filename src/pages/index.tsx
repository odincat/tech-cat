import type { GetServerSideProps, NextPage } from 'next';
import { Shell } from '@components/Shell';
import { protectedRoute } from '@lib/routeProtection';
import { SHomeHero } from '@sections/index/Hero';
import { trpc } from '@server/utils/trpc';

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     const auth = await protectedRoute(ctx, 'ADMIN');

//     if(auth?.redirect) return auth;

//     return {
//         props: {}
//     };
// }

const Home: NextPage = () => {
    const q = trpc.useQuery(['linkShortener.test']);

    if(!q) return null;

    return (
        <Shell title='home' topPadding={false}>
            <SHomeHero />
            {q.data}
        </Shell>
    );
};

export default Home;
