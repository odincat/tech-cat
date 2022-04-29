import '../styles/globals.scss'
import { IconContext } from 'react-icons'
import { UserContext } from '@lib/context'
import { useUserData } from '@lib/hooks'
import { NextComponentType } from 'next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { MantineProvider } from '@mantine/core'

interface AppProperties {
  Component: NextComponentType | any;
  pageProps: any;
}

const queryClient = new QueryClient;

const MyApp = ({ Component, pageProps }: AppProperties) => {
  const userData: any = useUserData();

  return (
    <>
    <UserContext.Provider value={userData}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
            <IconContext.Provider value={{ className: "global-icon" }}>
              <Component {...pageProps} />
              {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
            </IconContext.Provider>
        </MantineProvider>
      </QueryClientProvider>
    </UserContext.Provider>
    </>
  )
}

export default MyApp;
