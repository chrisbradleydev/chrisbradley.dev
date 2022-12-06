import type {GetStaticPaths, GetStaticProps} from 'next'
import Layout from '../../components/layout'
import {MDXLayoutRenderer} from '../../components/mdx'
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
  return (
    <Layout header={false} pageName={post.frontmatter.title || 'Untitled'}>
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

export const getStaticProps: GetStaticProps = async ({params}: any) => {
  const post = await getFileBySlug('posts', params.slug.join('/'))
  return {props: {post}}
}

export default Blog
