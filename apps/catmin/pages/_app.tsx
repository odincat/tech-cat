import '../styles/globals.scss'
import { IconContext } from 'react-icons'
import { UserContext } from '@lib/context'
import { useUserData } from '@lib/hooks'
import { NextComponentType } from 'next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

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
        <IconContext.Provider value={{ className: "global-icon" }}>
          <Component {...pageProps} />
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        </IconContext.Provider>
      </QueryClientProvider>
    </UserContext.Provider>
    </>
  )
}

export default MyApp;
