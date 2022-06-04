import '../styles/globals.scss';
import type { AppProps } from 'next/app'
import { Content, Footer, Header, PageContainer } from '@components/structure';
import { IconContext } from 'react-icons/lib';
import { useUserData } from '@lib/hooks';
import { UserContext, userDataProperties } from '@lib/context';
import { advancedConsoleLog } from 'advanced-cl';
import { useEffect } from 'react';
import utils from 'pacman/utils';

export const logger = new advancedConsoleLog('main');

const MyApp = ({ Component, pageProps }: AppProps) => {

  const userData: userDataProperties = useUserData();

  useEffect(() => {
    if(!utils.isProduction()) {
      logger.initialize();
    }
  }, []);

  return (
    <>
    <PageContainer>
      <UserContext.Provider value={userData}>
        <IconContext.Provider value={{ className: "global-icon" }}>
          <Header />

          <Content>
            <Component {...pageProps} />
          </Content>

          <Footer />
        </IconContext.Provider>
      </UserContext.Provider>
    </PageContainer>
    </>
  );
}

export default MyApp;
