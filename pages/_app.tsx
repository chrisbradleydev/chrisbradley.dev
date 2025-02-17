import type {Session} from 'next-auth'
import {SessionProvider} from 'next-auth/react'
import {type AppType} from 'next/app'
import {Fredoka} from 'next/font/google'
import * as React from 'react'
import {Theme, ThemeProvider} from '~/contexts/theme-provider'
import '~/styles/app.css'
import '~/styles/tailwind.css'
import debounce from '~/utils/debounce'
import {trpc} from '~/utils/trpc'

const fredoka = Fredoka({subsets: ['latin']})

const App: AppType<{session: Session | null}> = ({
  Component,
  pageProps: {session, ...pageProps},
}) => {
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
        <div className={fredoka.className}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
