import * as React from 'react'
import {useTheme} from '../contexts/theme-provider'
import Nav from './nav'
import Footer from './footer'

export const fullName = 'Chris Bradley'
export const projectName = 'chrisbradleydev'

function Layout({children}: {children: React.ReactNode}) {
  const [theme] = useTheme()
  return (
    <div className={theme ? theme : ''}>
      <div className="dark:bg-gray-900 flex flex-col dark:text-white text-gray-900">
        <Nav />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
