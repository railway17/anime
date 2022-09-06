import type { AppProps } from 'next/app'
import { PropsWithChildren, useEffect } from 'react'
import { AnimePage } from '../libs/types/AnimePage'
import React from 'react'
import { Router } from 'next/router'
import { Loader } from '../libs/components/loader'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const {
    Layout = ({ children }: PropsWithChildren<unknown>) => <div className="md:w-3/4 sm:w-full m-auto">{children}</div>,
  } = Component  as AnimePage<unknown>

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  useEffect(()=> {
    console.log('loading changes', loading)
  }, [loading])
      
  return (
    <Layout>
        <Loader loading={loading}/>
        <Component {...pageProps} setLoading={setLoading} loading={loading}/>
    </Layout>  
  )
}

export default MyApp
