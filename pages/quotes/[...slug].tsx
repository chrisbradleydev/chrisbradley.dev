import type {GetStaticPaths, GetStaticProps} from 'next'
import {BreadcrumbJsonLd} from '~/components/json-ld'
import Layout from '~/components/layout'
import {MDXLayoutRenderer} from '~/components/mdx'
import {
  FrontmatterQuote,
  formatSlug,
  getFileBySlug,
  getFiles,
} from '~/utils/mdx'
import {intToRoman} from '~/utils/numbers'

const Quote = ({
  quote,
}: {
  quote: {frontmatter: FrontmatterQuote; mdxSource: string}
}) => {
  const {frontmatter} = quote
  const name = getTitleFromQuoteSlug(frontmatter)
  const url = `/quotes/${frontmatter.slug}`

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {name: 'Home', url: '/'},
          {name: 'Quotes', url: '/quotes'},
          {name, url},
        ]}
      />
      <Layout
        header={false}
        pageName={name}
        seo={{
          url: `/quotes/${frontmatter.slug}`,
          title: name,
          description: `A quote by ${frontmatter.author}.`,
        }}
      >
        <MDXLayoutRenderer mdxSource={quote.mdxSource} />
      </Layout>
    </>
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

const getTitleFromQuoteSlug = (frontmatter: FrontmatterQuote): string => {
  const {author, slug} = frontmatter
  const match = /-(\d+)$/.exec(slug)
  const num = match?.[1]
  return `${author ? author : 'Unknown'}${num ? ` ${intToRoman(parseInt(num))}` : ''}`
}

export default Quote
