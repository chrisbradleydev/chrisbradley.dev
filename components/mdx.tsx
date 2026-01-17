'use client'

import {getMDXComponent} from 'mdx-bundler/client'
import {useMemo} from 'react'

const MDXHeader = ({children}: {children: string}) => {
  return (
    <div className="my-10 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
      <h1>{children}</h1>
    </div>
  )
}

const QuoteHeader = ({children}: {children: string}) => {
  return (
    <div className="my-10 text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
      <h1>
        <span className="underline decoration-pink-300 decoration-dashed decoration-3 underline-offset-4">
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

const mdxComponents = {MDXHeader, QuoteHeader, QuoteBody}

/* eslint-disable react-hooks/static-components -- getMDXComponent from mdx-bundler requires creating component at runtime */
export const MDXLayoutRenderer = ({
  mdxSource,
  ...rest
}: {
  mdxSource: string
}) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  return <MDXLayout components={mdxComponents} {...rest} />
}
/* eslint-enable react-hooks/static-components */
