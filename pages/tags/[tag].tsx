import Layout from '~/components/layout'
import {
  FrontmatterPost,
  FrontmatterQuote,
  getAllPosts,
  getAllQuotes,
} from '~/utils/mdx'
import {getAllTags, TagsCount} from '~/utils/tags'

function Tag({
  posts,
  quotes,
  tag,
}: {
  posts: FrontmatterPost[]
  quotes: FrontmatterQuote[]
  tag: string
}) {
  return (
    <Layout pageName={tag}>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>{post.title ?? 'Untitled'}</li>
        ))}
        {quotes.map(quote => (
          <li key={quote.slug}>{quote.author}</li>
        ))}
      </ul>
    </Layout>
  )
}

export function getStaticPaths() {
  const tags: TagsCount = {
    ...getAllTags('posts'),
    ...getAllTags('quotes'),
  }
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
  const posts = getAllPosts()
  const quotes = getAllQuotes()
  const filteredPosts = posts.filter(
    post => !post.draft && post.tags.includes(params.tag),
  )
  const filteredQuotes = quotes.filter(quote => quote.tags.includes(params.tag))
  return {
    props: {posts: filteredPosts, quotes: filteredQuotes, tag: params.tag},
  }
}

export default Tag
