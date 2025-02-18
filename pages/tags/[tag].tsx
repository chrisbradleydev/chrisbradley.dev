import Link from 'next/link'
import Layout from '~/components/layout'
import {
  FrontmatterPost,
  FrontmatterQuote,
  getAllPosts,
  getAllQuotes,
} from '~/utils/mdx'
import {getAllTags, TagsCount} from '~/utils/tags'

const romanNumerals: [string[], string[]] = [
  ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
  ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
]

function intToRoman(num: number): string {
  const tensDigits = romanNumerals[1]
  const onesDigits = romanNumerals[0]
  if (!tensDigits || !onesDigits) return ''
  const tens = Math.floor(num / 10)
  const ones = num % 10
  return (
    (tens < tensDigits.length ? tensDigits[tens]! : '') +
    (ones < onesDigits.length ? onesDigits[ones]! : '')
  )
}

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
          <li key={post.slug}>
            <Link
              className="hover:text-pink-400 dark:hover:text-pink-300"
              href={`/blog/${post.slug}`}
            >
              {post.title ?? 'Untitled'}
            </Link>
          </li>
        ))}
        {quotes.map(quote => (
          <li key={quote.slug}>
            <Link
              className="hover:text-pink-400 dark:hover:text-pink-300"
              href={`/quotes/${quote.slug}`}
            >
              {quote.author}
              {(() => {
                const match = /-(\d+)$/.exec(quote.slug)
                const num = match?.[1]
                return num && parseInt(num) > 1
                  ? ` ${intToRoman(parseInt(num))}`
                  : ''
              })()}
            </Link>
          </li>
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
