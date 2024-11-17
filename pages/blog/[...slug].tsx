import type {GetStaticPaths, GetStaticProps} from 'next'
import Layout from '~/components/layout'
import {MDXLayoutRenderer} from '~/components/mdx'
import {FrontmatterType, formatSlug, getFileBySlug, getFiles} from '~/utils/mdx'

const Blog = ({
  post,
}: {
  post: {frontmatter: FrontmatterType; mdxSource: string}
}) => {
  return (
    <Layout header={false} pageName={post.frontmatter.title ?? 'Untitled'}>
      {post.frontmatter.draft !== true ? (
        <MDXLayoutRenderer mdxSource={post.mdxSource} />
      ) : null}
    </Layout>
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
