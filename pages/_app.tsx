import {httpBatchLink} from '@trpc/client/links/httpBatchLink'
import {loggerLink} from '@trpc/client/links/loggerLink'
import {withTRPC} from '@trpc/next'
import {SessionProvider} from 'next-auth/react'
import type {AppProps} from 'next/app'
import * as React from 'react'
import superjson from 'superjson'
import {Theme, ThemeProvider} from '../contexts/theme-provider'
import {AppRouter} from '../server/router'
import '../styles/app.css'
import '../styles/globals.css'
import debounce from '../utils/debounce'
import {SSRContext} from '../utils/trpc'

function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
  function handleScroll() {
    document.body.classList.toggle('scrolled', window.scrollY > 0)
  }

  React.useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 50)
    document.addEventListener('scroll', debouncedScroll)
    return () => document.removeEventListener('scroll', debouncedScroll)
  }, [])

  return (
    <SessionProvider session={session} refetchInterval={60 * 5}>
      <ThemeProvider specifiedTheme={Theme.DARK}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return ''
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export default withTRPC<AppRouter>({
  config({ctx}) {
    return {
      headers() {
        if (ctx?.req) {
          // forward client headers to the server
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          }
        }
        return {}
      },
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
  ssr: true,
})(App)
