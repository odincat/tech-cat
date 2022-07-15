import '../styles/globals.scss';

import '@fontsource/maven-pro/700.css';
import '@fontsource/roboto/index.css';

import { IconContext } from 'react-icons/lib';
import { useEffect } from 'react';
import { NextComponentType } from 'next';
import { injectGlobalStyles } from '@styling/global';
import { Content, Footer, Header, PageContainer } from '@components/structure';
import { CookieJar } from '@components/CookieBox';
import { withTRPC } from '@trpc/next';
import { AppRouter } from '@api/trpc/[trpc]';
import superjson from 'superjson';

// export const logger = new advan('main');

interface AppProperties {
    Component: NextComponentType | any;
    pageProps: any;
}

const CatHotel = ({ Component, pageProps }: AppProperties) => {
    injectGlobalStyles();

    useEffect(() => {
        // if (!utils.isProduction()) {
        //     logger.initialize();
        // }
    }, []);

    return (
        <>
            <PageContainer>
                <IconContext.Provider value={{ className: 'global-icon' }}>
                    <Component {...pageProps} />

                    <CookieJar />
                </IconContext.Provider>
            </PageContainer>
        </>
    );
};

export default withTRPC<AppRouter>({
    config() {
        const url = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/trpc`
            : `http://localhost:7000/api/trpc`;

        return {
            url,
            transformer: superjson,
            queryClientConfig: {
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                    },
                },
            },
        };
    },
    ssr: true,
})(CatHotel);
