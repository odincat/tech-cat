import '../styles/globals.scss';

import '@fontsource/maven-pro/700.css';
import '@fontsource/roboto/index.css';

import { IconContext } from 'react-icons/lib';
import { useUserData } from '@lib/hooks';
import { UserContext, userDataProperties } from '@lib/context';
import { advancedConsoleLog } from 'advanced-cl';
import { useEffect } from 'react';
import utils from 'pacman/utils';
import { NextComponentType } from 'next';
import { injectGlobalStyles } from '@styling/global';
import { Content, Footer, Header, PageContainer } from '@components/structure';
import { CookieJar } from '@components/CookieBox';

export const logger = new advancedConsoleLog('main');

interface AppProperties {
    Component: NextComponentType | any;
    pageProps: any;
}

const CatHotel = ({ Component, pageProps }: AppProperties) => {
    injectGlobalStyles();

    const userData: userDataProperties = useUserData();

    useEffect(() => {
        // if (!utils.isProduction()) {
        //     logger.initialize();
        // }
    }, []);

    return (
        <>
            <PageContainer>
                <UserContext.Provider value={userData}>
                    <IconContext.Provider value={{ className: 'global-icon' }}>
                        <Header />

                        <Content>
                            <Component {...pageProps} />
                        </Content>

                        <CookieJar />

                        <Footer />
                    </IconContext.Provider>
                </UserContext.Provider>
            </PageContainer>
        </>
    );
};

export default CatHotel;
