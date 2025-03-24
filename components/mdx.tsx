import {getMDXComponent} from 'mdx-bundler/client'
import * as React from 'react'

const MDXHeader = ({children}: {children: string}) => {
  return (
    <div className="my-10 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
      <h1>{children}</h1>
    </div>
  )
}

const QuoteHeader = ({children}: {children: string}) => {
  return (
    <div className="my-10 text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
      <h1>
        <span className="decoration-3 underline decoration-pink-300 decoration-dashed underline-offset-4">
          {children}
        </span>
      </h1>
    </div>
  )
}

const QuoteBody = ({children}: {children: string}) => {
  return (
    <div className="indent-8 text-xl">
      <span className="text-pink-300">&quot;</span>
      {children}
      <span className="text-pink-300">&quot;</span>
    </div>
  )
}

export const MDXLayoutRenderer = ({
  mdxSource,
  ...rest
}: {
  mdxSource: string
}) => {
  const MDXLayout = React.useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  return (
    <MDXLayout components={{MDXHeader, QuoteHeader, QuoteBody}} {...rest} />
  )
}
