import '../styles/globals.scss';

import '@fontsource/maven-pro/700.css';
import '@fontsource/roboto';
import '@fontsource/roboto/900.css';
import '@fontsource/press-start-2p';
import '@fontsource/neucha';
import '@styles/fonts.css';

import { IconContext } from 'react-icons/lib';
import { NextComponentType } from 'next';
import { injectGlobalStyles } from '@styling/global';
import { PageContainer } from '@components/Structure';
import { CookieJar } from '@components/CookieBox';
import { UserProvider } from '@lib/context';
import { trpc } from '@lib/trpc';
import { Toaster } from 'react-hot-toast';

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
                        <Toaster position='top-center' containerStyle={{ borderRadius: '4px' }} toastOptions={{ className: 'rounded-[4px] dark:bg-zinc-900 dark:text-neutral-50' }} />
                </IconContext.Provider>
            </PageContainer>
        </UserProvider>
        </>
    );
};

export default trpc.withTRPC(CatHotel);
