import type { NextPage } from 'next';
import { Shell } from '@components/Shell';
import { Hero } from '@sections/index/Hero';
import { AboutMe } from '@sections/index/AboutMe';
import { LatestArticles } from '@sections/index/LatestArticles';

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
