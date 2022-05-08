import '../styles/globals.scss'
import { IconContext } from 'react-icons'
import { UserContext } from '@lib/context'
import { useUserData } from '@lib/hooks'
import { NextComponentType } from 'next'
import { MantineProvider } from '@mantine/core'
import AuthRoute from '@components/auth/authRoute/AuthRoute'

interface AppProperties {
  Component: NextComponentType | any;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: AppProperties) => {
  const userData: any = useUserData();

  return (
    <>
    <UserContext.Provider value={userData}>
        <MantineProvider>
            <IconContext.Provider value={{ className: "global-icon" }}>
              {Component.auth ? (
                <AuthRoute>
                  <Component {...pageProps} />    
                </AuthRoute>
              ) : (
                <Component {...pageProps} />
              )}
            </IconContext.Provider>
        </MantineProvider>
    </UserContext.Provider>
    </>
  )
}

export default MyApp;
