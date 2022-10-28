import {getMDXComponent} from 'mdx-bundler/client'
import type {GetStaticPaths, GetStaticProps} from 'next'
import * as React from 'react'
import Layout from '../../components/layout'
import {
  formatSlug,
  FrontmatterType,
  getFileBySlug,
  getFiles,
} from '../../utils/mdx'

const Blog = ({
  post,
}: {
  post: {frontmatter: FrontmatterType; mdxSource: string}
}) => {
  const MDXLayout = React.useMemo(
    () => getMDXComponent(post.mdxSource),
    [post.mdxSource],
  )
  return (
    <Layout header={false} pageName={post.frontmatter.title || 'Untitled'}>
      {post.frontmatter.draft !== true ? (
        <MDXLayout />
      ) : (
        <div className="mt-24 text-center">
          <>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </>
        </div>
      )}
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

export const getStaticProps: GetStaticProps = async ({params}: any) => {
  const post = await getFileBySlug('posts', params.slug.join('/'))
  return {props: {post}}
}

export default Blog
