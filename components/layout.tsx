import Head from 'next/head'
import * as React from 'react'
import {projectName} from '../content/metadata'
import {useTheme} from '../contexts/theme-provider'
import Container from './container'
import Footer from './footer'
import Header from './header'
import Nav from './nav'

function getTitle(pageName: string) {
  if (pageName === 'Home') {
    return projectName
  }
  return `${pageName && pageName + ' | '}${projectName}`
}

function Layout({
  children,
  header = true,
  pageName,
}: {
  children: React.ReactNode
  header?: boolean
  pageName: string
}) {
  const [theme] = useTheme()
  return (
    <>
      <Head>
        <title>{getTitle(pageName)}</title>
      </Head>
      <div className={theme ? theme : undefined}>
        <div
          className="flex
          flex-col
          bg-white
          transition
          duration-500
          dark:bg-neutral-900
          dark:text-white"
        >
          <Nav />
          {header ? <Header heading={pageName} /> : null}
          <main>
            <Container>{children}</Container>
          </main>
          <div className="h-screen" />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
