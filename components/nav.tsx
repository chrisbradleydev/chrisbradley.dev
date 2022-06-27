import {Disclosure} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'
import {useRouter} from 'next/router'
import * as React from 'react'
import {Theme, useTheme} from '../contexts/theme-provider'
import Logo from './logo'
import Moon from './moon'
import Sun from './sun'

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
            'block rounded-md px-3 py-2 text-base font-medium',
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
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between px-4 sm:px-0">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <a className="group inline-block p-2 focus:outline-none">
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
                            'underlined block text-lg hover:text-pink-400 focus:text-pink-400 focus:outline-none dark:hover:text-pink-300 dark:focus:text-pink-300',
                            {
                              'active text-pink-400 dark:text-pink-300': active,
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
              <div className="hidden items-center md:flex">
                <div className="flex-shrink-0">
                  {/* Toggle theme button */}
                  <button
                    className="group inline-block p-2 focus:outline-none"
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
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
            <div className="space-y-1 rounded-md sm:p-2">
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
