import '../styles/globals.scss';

import '@fontsource/maven-pro/700.css';
import '@fontsource/roboto';
import '@fontsource/press-start-2p';
import '@fontsource/neucha';

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
                        <Component className='' {...pageProps} />

                        <CookieJar />
                </IconContext.Provider>
            </PageContainer>
        </UserProvider>
        </>
    );
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

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

        const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/trpc` : `http://localhost:4700/api/trpc`;

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
    ssr: false,
})(CatHotel);
