import Head from 'next/head'
import * as React from 'react'
import {projectName} from '../content/metadata'
import {useTheme} from '../contexts/theme-provider'
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
        <div className="flex flex-col text-gray-900 dark:bg-gray-900 dark:text-white">
          <Nav />
          {header ? <Header heading={pageName} /> : null}
          <main>
            <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
              <section className="h-screen">{children}</section>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
