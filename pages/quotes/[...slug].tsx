import type {GetStaticPaths, GetStaticProps} from 'next'
import Layout from '~/components/layout'
import {MDXLayoutRenderer} from '~/components/mdx'
import {
  FrontmatterQuote,
  formatSlug,
  getFileBySlug,
  getFiles,
} from '~/utils/mdx'

const Quote = ({
  quote,
}: {
  quote: {frontmatter: FrontmatterQuote; mdxSource: string}
}) => {
  return (
    <Layout header={false} pageName={quote.frontmatter.quote ?? 'Untitled'}>
      <MDXLayoutRenderer mdxSource={quote.mdxSource} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const files = getFiles('quotes')
  return {
    paths: files.map((file: string) => ({
      params: {
        slug: formatSlug(file).split('/'),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  if (!context?.params?.slug) {
    return {props: {}}
  }

  let slug: string[] = []
  if (Array.isArray(context.params.slug)) {
    slug = context.params.slug
  } else if (typeof context.params.slug === 'string') {
    slug[0] = context.params.slug
  }

  const quote = await getFileBySlug('quotes', slug.join('/'))
  return {props: {quote}}
}

export default Quote
