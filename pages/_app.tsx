import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <div>
    <Component {...pageProps} />
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-218905695-1"></script>
    </div>
}

export default MyApp
