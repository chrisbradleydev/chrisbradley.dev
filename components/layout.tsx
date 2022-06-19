import * as React from 'react'
import Head from 'next/head'
import {useTheme} from '../contexts/theme-provider'
import Nav from './nav'
import Header from './header'
import Footer from './footer'

export const fullName = 'Chris Bradley'
export const projectName = 'chrisbradleydev'

function getTitle(pageName: string) {
  if (pageName === 'Home') {
    return projectName
  }
  return `${pageName && pageName + ' | '}${projectName}`
}

function Layout({
  children,
  hero,
  pageName,
}: {
  children: React.ReactNode
  hero?: React.ReactNode
  pageName: string
}) {
  const [theme] = useTheme()
  return (
    <>
      <Head>
        <title>{getTitle(pageName)}</title>
      </Head>
      <div className={theme ? theme : undefined}>
        <div className="dark:bg-gray-900 flex flex-col dark:text-white text-gray-900">
          <Nav />
          <Header heading={pageName}>{hero}</Header>
          <main>
            <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
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
