import type {GetStaticPaths, GetStaticProps} from 'next'
import {ArticleJsonLd, BreadcrumbJsonLd} from '~/components/json-ld'
import Layout from '~/components/layout'
import {MDXLayoutRenderer} from '~/components/mdx'
import {fullName} from '~/content/metadata'
import {FrontmatterPost, formatSlug, getFileBySlug, getFiles} from '~/utils/mdx'

const Blog = ({
  post,
}: {
  post: {frontmatter: FrontmatterPost; mdxSource: string}
}) => {
  const {frontmatter} = post
  const name = frontmatter.title
  const url = `/blog/${frontmatter.slug}`

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {name: 'Home', url: '/'},
          {name: 'Blog', url: '/blog'},
          {name, url},
        ]}
      />
      <ArticleJsonLd
        title={frontmatter.title}
        description={frontmatter.description}
        url={url}
        datePublished={frontmatter.datePublished}
        dateModified={frontmatter.dateModified}
      />
      <Layout
        header={false}
        pageName={frontmatter.title}
        seo={{
          url,
          description: frontmatter.description,
          type: 'article',
          article: {
            publishedTime: frontmatter.datePublished,
            modifiedTime: frontmatter.dateModified,
            author: fullName,
            tags: frontmatter.tags,
          },
        }}
      >
        {frontmatter.draft !== true ? (
          <MDXLayoutRenderer mdxSource={post.mdxSource} />
        ) : null}
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const files = getFiles('posts')
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

  const post = await getFileBySlug('posts', slug.join('/'))
  return {props: {post}}
}

export default Blog
