import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {MoonIcon, SunIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import {signIn, signOut, useSession} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import * as React from 'react'
import {Theme, useTheme} from '~/contexts/theme-provider'
import Container from './container'
import Logo from './logo'

const navItems = [
  {name: 'Blog', href: '/blog'},
  {name: 'Quotes', href: '/quotes'},
  {name: 'Tags', href: '/tags'},
  {name: 'Cuatro', href: '/cuatro'},
  {name: 'Cinco', href: '/cinco'},
  {name: 'Seis', href: '/seis'},
]

const MenuButton = React.forwardRef(
  (
    props: {
      children: React.ReactNode
      onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    },
    ref: React.LegacyRef<HTMLButtonElement>,
  ) => {
    const {children, onClick, ...rest} = props
    return (
      <button
        ref={ref}
        onClick={onClick}
        className="flex basis-1/2 justify-center rounded-md py-4 shadow-sm hover:bg-neutral-700 sm:basis-1/4 [&_path]:hover:fill-white"
        {...rest}
      >
        <div className="flex h-14 w-14 items-center">{children}</div>
      </button>
    )
  },
)

MenuButton.displayName = 'MenuButton'

function getProfileIcon({
  circleSize = 8,
  profileImage,
  width = 32,
  height = 32,
}: {
  circleSize?: number
  profileImage: string
  width?: number
  height?: number
}) {
  if (profileImage) {
    return (
      <Image
        className="rounded-full"
        src={profileImage}
        alt=""
        width={width}
        height={height}
        priority={true}
      />
    )
  }
  return (
    <div
      className={clsx(
        `h-${circleSize} w-${circleSize} flex items-center rounded-full`,
        {
          'hover:border-2 hover:border-neutral-900 hover:bg-white [&_path]:hover:fill-neutral-900':
            circleSize === 8,
        },
      )}
    >
      <UserCircleIcon />
    </div>
  )
}

function getThemeIcon(theme: Theme, menuButton = false) {
  return theme === Theme.DARK ? (
    <MoonIcon
      className={clsx({
        '[&_path]:hover:fill-neutral-900': !menuButton,
      })}
    />
  ) : (
    <SunIcon className="[&_path]:hover:fill-white" />
  )
}

function Nav() {
  const router = useRouter()
  const [theme, setTheme] = useTheme()
  const {data: sessionData} = useSession()

  const currentTheme = theme ?? Theme.DARK
  const profileImage = sessionData?.user?.image ?? ''

  function handleThemeClick() {
    setTheme(previousTheme =>
      previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK,
    )
  }

  return (
    <Disclosure as="nav">
      {({open}) => (
        <>
          <Container>
            <div className="flex h-16 items-center justify-between md:px-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    href="/"
                    className="group inline-block p-2 focus:outline-none"
                    aria-label="Homepage"
                  >
                    <Logo />
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-6">
                  {navItems.map(item => {
                    const active =
                      item.href === router.pathname ||
                      router.pathname.startsWith(item.href)
                    return (
                      <Link
                        href={item.href}
                        key={item.name}
                        className={clsx(
                          'underlined block text-lg hover:text-pink-400 focus:text-pink-400 focus:outline-none dark:hover:text-pink-300 dark:focus:text-pink-300',
                          {
                            'active text-pink-400 dark:text-pink-300': active,
                          },
                        )}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
              <div className="hidden items-center md:flex">
                {/* Toggle theme button */}
                <button
                  className={clsx(
                    'rounded-full focus:outline-none focus:ring-2',
                    {
                      'focus:ring-white focus:ring-offset-neutral-900':
                        theme === Theme.DARK,
                      'focus:ring-neutral-900 focus:ring-offset-white':
                        theme === Theme.LIGHT,
                    },
                  )}
                  onClick={handleThemeClick}
                  onMouseOut={event => event.currentTarget.blur()}
                >
                  <span className="sr-only">Toggle theme</span>
                  <div className="flex h-8 w-8 items-center rounded-full hover:bg-neutral-900 dark:hover:bg-white">
                    {getThemeIcon(currentTheme)}
                  </div>
                </button>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <Menu.Button
                    className={clsx(
                      'flex max-w-xs items-center rounded-full bg-neutral-900 text-sm text-white focus:outline-none focus:ring-2',
                      {
                        'focus:ring-white focus:ring-offset-neutral-900':
                          theme === Theme.DARK,
                        'focus:ring-neutral-900 focus:ring-offset-white':
                          theme === Theme.LIGHT,
                      },
                    )}
                  >
                    <span className="sr-only">Open user menu</span>
                    {getProfileIcon({profileImage})}
                  </Menu.Button>

                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {[
                        ...(sessionData
                          ? [{name: 'Sign out', href: '/api/auth/signout'}]
                          : [{name: 'Sign in', href: '/api/auth/signin'}]),
                      ].map(item => (
                        <Menu.Item key={item.name}>
                          {({active}) => (
                            <Link
                              href={item.href}
                              className={clsx(
                                active ? 'bg-neutral-100' : '',
                                'block px-4 py-2 text-sm text-neutral-700',
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 shadow-sm hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-neutral-900">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </Container>

          <Disclosure.Panel className="px-2 py-2 md:hidden">
            <div className="space-y-1 rounded-md sm:p-2">
              {navItems.map(item => {
                const active =
                  item.href === router.pathname ||
                  router.pathname.startsWith(item.href)
                return (
                  <Disclosure.Button key={item.name} as={React.Fragment}>
                    <Link
                      href={item.href}
                      className={clsx(
                        active
                          ? 'bg-pink-400 text-white'
                          : 'text-neutral-900 hover:bg-neutral-700 hover:text-white dark:text-neutral-300',
                        'block rounded-md px-3 py-2 text-base font-medium shadow-sm',
                      )}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </Disclosure.Button>
                )
              })}
            </div>
            <div className="mt-1 flex space-x-1">
              <MenuButton onClick={handleThemeClick}>
                {getThemeIcon(currentTheme, true)}
              </MenuButton>
              <MenuButton
                onClick={
                  sessionData ? () => void signOut() : () => void signIn()
                }
              >
                {getProfileIcon({
                  circleSize: 14,
                  profileImage,
                  width: 64,
                  height: 64,
                })}
              </MenuButton>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Nav
