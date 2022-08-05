import type { GetServerSideProps, NextPage } from 'next';
import { Shell } from '@components/Shell';
import { protectedRoute } from '@lib/routeProtection';
import { SHomeHero } from '@sections/index/Hero';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const auth = await protectedRoute(ctx, 'ADMIN');

    if(auth?.redirect) return auth;

    return {
        props: {}
    };
}

const Home: NextPage = () => {

    return (
        <Shell title='home' topPadding={false}>
            <SHomeHero />
        </Shell>
    );
};

export default Home;
