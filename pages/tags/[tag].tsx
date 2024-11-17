import Layout from '~/components/layout'
import {FrontmatterType, getAllFilesFrontmatter} from '~/utils/mdx'
import {getAllTags} from '~/utils/tags'

function Tag({posts, tag}: {posts: FrontmatterType[]; tag: string}) {
  return (
    <Layout pageName={tag}>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>{post.title ?? 'Untitled'}</li>
        ))}
      </ul>
    </Layout>
  )
}

export function getStaticPaths() {
  const tags = getAllTags('posts')
  return {
    paths: Object.keys(tags).map(tag => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export function getStaticProps({params}: {params: {tag: string}}) {
  const posts = getAllFilesFrontmatter('posts')
  const filteredPosts = posts.filter(
    post => !post.draft && post.tags.includes(params.tag),
  )
  return {props: {posts: filteredPosts, tag: params.tag}}
}

export default Tag
