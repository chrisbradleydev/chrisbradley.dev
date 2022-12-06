import {getMDXComponent} from 'mdx-bundler/client'
import * as React from 'react'

const BlogHeader = ({children}: {children: string}) => {
  return (
    <div
      className="my-10
      text-3xl
      font-extrabold
      tracking-tight
      text-gray-900
      dark:text-gray-100
      sm:text-4xl
      md:text-5xl"
    >
      <h1>{children}</h1>
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
  return <MDXLayout components={{BlogHeader}} {...rest} />
}
