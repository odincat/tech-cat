import '../styles/globals.scss';

import '@fontsource/maven-pro/700.css';
import '@fontsource/roboto/index.css';

import { IconContext } from 'react-icons/lib';
import { useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType, NextComponentType } from 'next';
import { injectGlobalStyles } from '@styling/global';
import { PageContainer } from '@components/structure';
import { CookieJar } from '@components/CookieBox';
import { withTRPC } from '@trpc/next';
import { AppRouter } from '@api/trpc/[trpc]';
import superjson from 'superjson';
import { UserProvider } from '@lib/context';

// export const logger = new advan('main');

interface AppProperties {
    Component: NextComponentType | any;
    pageProps: any;
}

const CatHotel = ({ Component, pageProps }: AppProperties) => {
    injectGlobalStyles();

    return (
        <>
        <UserProvider>
            <PageContainer>
                <IconContext.Provider value={{ className: 'global-icon' }}>
                        <Component {...pageProps} />

                        <CookieJar />
                </IconContext.Provider>
            </PageContainer>
        </UserProvider>
        </>
    );
};

export default withTRPC<AppRouter>({
    config({ ctx }) {
        if (typeof window !== 'undefined') {
            return {
              transformer: superjson,
              url: '/api/trpc',
              queryClientConfig: {
                    defaultOptions: {
                        queries: {
                            refetchOnWindowFocus: false,
                        },
                    },
                }
            };
        }

        const ONE_DAY_SECONDS = 60 * 60 * 24;

        ctx?.res?.setHeader(
          'Cache-Control',
          `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`,
        );

        const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/trpc` : `http://localhost:7000/api/trpc`;

        return {
            url,
            transformer: superjson,
            headers: {
                'x-ssr': '1'
            },
            queryClientConfig: {
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                    },
                },
            }
        };
    },
    ssr: true,
})(CatHotel);
