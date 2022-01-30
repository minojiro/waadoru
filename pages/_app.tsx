import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect} from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  const GA_ID = pageProps.GA_ID
  const gtmSrc = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`

  return <div>
      {GA_ID ? (
        <>
          <Head>
            <script async src={gtmSrc}></script>
          </Head>
          <script dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `}}>
          </script>
        </>
      ):''}
      <Component {...pageProps} />
    </div>
}

export default MyApp
