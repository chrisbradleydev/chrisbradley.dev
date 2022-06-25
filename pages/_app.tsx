import * as React from 'react'
import type {AppProps} from 'next/app'
import {withTRPC} from '@trpc/next'
import {loggerLink} from '@trpc/client/links/loggerLink'
import {httpBatchLink} from '@trpc/client/links/httpBatchLink'
import superjson from 'superjson'
import {AppRouter} from '../server/routers/_app'
import {Theme, ThemeProvider} from '../contexts/theme-provider'
import {SSRContext} from '../utils/trpc'
import debounce from '../utils/debounce'
import '../styles/globals.css'
import '../styles/app.css'

function App({Component, pageProps}: AppProps) {
  function handleScroll() {
    document.body.classList.toggle('scrolled', window.scrollY > 0)
  }

  React.useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 50)
    document.addEventListener('scroll', debouncedScroll)
    return () => document.removeEventListener('scroll', debouncedScroll)
  }, [])

  return (
    <ThemeProvider specifiedTheme={Theme.DARK}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return ''
  }
  if (process.env.VERCEL_URL) {
    return process.env.VERCEL_URL
  }
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export default withTRPC<AppRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: options =>
            process.env.NODE_ENV === 'development' ||
            (options.direction === 'down' && options.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          maxBatchSize: 10,
        }),
      ],
      transformer: superjson,
    }
  },
  ssr: true,
  responseMeta(options) {
    const context = options.ctx as SSRContext
    if (context.status) {
      return {
        status: context.status,
      }
    }
    const error = options.clientErrors[0]
    if (error) {
      return {
        status: error.data?.httpStatus ?? 500,
      }
    }
    return {}
  },
})(App)
