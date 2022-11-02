import type {GetStaticProps} from 'next'
import Link from 'next/link'
import Layout from '../../components/layout'
import {FrontmatterType, getAllFilesFrontmatter} from '../../utils/mdx'

function Blog({posts}: {posts: FrontmatterType[]}) {
  return (
    <Layout pageName="Blog">
      <ul>
        {posts.length
          ? posts.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <a>{post.title || 'Untitled'}</a>
                </Link>
              </li>
            ))
          : null}
      </ul>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontmatter('posts')
  return {props: {posts}}
}

export default Blog
