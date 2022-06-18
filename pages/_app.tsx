import * as React from 'react'
import type {AppProps} from 'next/app'
import {Theme, ThemeProvider} from '../contexts/theme-provider'
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

export default App
