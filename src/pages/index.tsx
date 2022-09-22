import type { GetServerSideProps, NextPage } from 'next';
import { Shell } from '@components/Shell';
import { protectedRoute } from '@lib/routeProtection';
import { Hero } from '@sections/index/Hero';
import { AboutMe } from '@sections/index/AboutMe';
import { LatestArticles } from '@sections/index/LatestArticles';
import { Experience } from '@sections/index/Experience';

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     const auth = await protectedRoute(ctx, 'ADMIN');

//     if(auth?.redirect) return auth;

//     return {
//         props: {}
//     };
// }

const Home: NextPage = () => {

    return (
        <Shell title='home' topPadding={false}>
            <Hero />
            <AboutMe />
            <LatestArticles />
        </Shell>
    );
};

export default Home;
