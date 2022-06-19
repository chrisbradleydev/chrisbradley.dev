import * as React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import {Disclosure} from '@headlessui/react'
import Logo from './logo'
import Moon from './moon'
import Sun from './sun'
import {Theme, useTheme} from '../contexts/theme-provider'

const navItems = [
  {name: 'Uno', href: '/uno'},
  {name: 'Dos', href: '/dos'},
  {name: 'Tres', href: '/tres'},
  {name: 'Cuatro', href: '/cuatro'},
  {name: 'Cinco', href: '/cinco'},
  {name: 'Seis', href: '/seis'},
]

const NextLink = React.forwardRef(
  (
    props: {
      active: boolean
      children: string
      href: string
    },
    ref: React.LegacyRef<HTMLAnchorElement>,
  ) => {
    const {active, children, href, ...rest} = props
    return (
      <Link href={href}>
        <a
          ref={ref}
          className={clsx(
            active
              ? 'bg-pink-400 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          )}
          aria-current={active ? 'page' : undefined}
          {...rest}
        >
          {children}
        </a>
      </Link>
    )
  },
)

NextLink.displayName = 'NextLink'

function Nav() {
  const {pathname} = useRouter()
  const [theme, setTheme] = useTheme()

  function handleClick() {
    setTheme(previousTheme =>
      previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK,
    )
  }

  return (
    <Disclosure as="nav">
      {({open}) => (
        <>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 px-4 sm:px-0">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <a className="group focus:outline-none inline-block p-2">
                      <Logo />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-6">
                  {navItems.map(item => {
                    const active =
                      item.href === pathname || pathname.startsWith(item.href)
                    return (
                      <Link key={item.name} href={item.href}>
                        <a
                          href={item.href}
                          className={clsx(
                            'block focus:outline-none dark:focus:text-pink-300 dark:hover:text-pink-300 focus:text-pink-400 hover:text-pink-400 text-lg underlined',
                            {
                              'active dark:text-pink-300 text-pink-400': active,
                            },
                          )}
                          aria-current={active ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    )
                  })}
                </div>
              </div>
              <div className="hidden md:flex items-center">
                <div className="flex-shrink-0">
                  {/* Toggle theme button */}
                  <button
                    className="group focus:outline-none inline-block p-2"
                    onClick={handleClick}
                    onMouseOut={event => event.currentTarget.blur()}
                  >
                    <span className="sr-only">Toggle theme</span>
                    {theme === Theme.DARK ? <Moon /> : <Sun />}
                  </button>
                </div>
              </div>
              <div className="flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="px-2 py-2 md:hidden">
            <div className="rounded-md space-y-1 sm:p-2">
              {navItems.map(item => {
                const active =
                  item.href === pathname || pathname.startsWith(item.href)
                return (
                  <Disclosure.Button key={item.name} as={React.Fragment}>
                    <NextLink active={active} href={item.href}>
                      {item.name}
                    </NextLink>
                  </Disclosure.Button>
                )
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Nav
