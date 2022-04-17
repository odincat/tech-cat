import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { IconContext } from 'react-icons'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@lib/context'
import { useUserData } from '@lib/hooks'
import Router from 'next/router'
import { useUser } from '@lib/utils'
import { NextComponentType } from 'next'

interface AppProperties {
  Component: NextComponentType | any;
  pageProps: any;
}

function MyApp({ Component, pageProps }: AppProperties) {
  const userData: any = useUserData();

  return (
    <>
    <UserContext.Provider value={userData}>
      <IconContext.Provider value={{ className: "global-icon" }}>
        <Component {...pageProps} />
      </IconContext.Provider>
    </UserContext.Provider>
    </>
  )
}

export default MyApp
