import * as React from 'react'

function Header({
  children,
  heading,
}: {
  children?: React.ReactNode
  heading: string
}) {
  return (
    <header className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children ? (
          <>
            <h1 className="hidden">{heading}</h1>
            {children}
          </>
        ) : (
          <h1 className="text-3xl font-bold">{heading}</h1>
        )}
      </div>
    </header>
  )
}

export default Header
