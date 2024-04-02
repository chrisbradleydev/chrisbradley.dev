import type { GetStaticProps } from 'next'
import Link from 'next/link'
import Grid from '../../components/grid'
import Layout from '../../components/layout'
import Tag from '../../components/tag'
import { FrontmatterType, getAllFilesFrontmatter } from '../../utils/mdx'

function PostCard({post}: {post: FrontmatterType}) {
  return (
    <article
      className="col-span-4
      mb-10
      flex
      flex-col
      overflow-hidden
      rounded-b-lg
      shadow-md
      transition-transform
      duration-500
      ease-in-out
      hover:scale-105"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex
        flex-1
        flex-col
        justify-between
        bg-gradient-to-b
        from-neutral-200
        dark:from-neutral-800
        dark:to-neutral-900"
      >
        <div className="h-28">
          <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
            <path
              className="fill-white dark:fill-neutral-900"
              d="M0,100
              C150,200
              350,0
              500,100
              L500,00
              L0,00
              Z"
            />
          </svg>
        </div>
        <div className="grow">
          <div className="mt-2 block px-6 py-8">
            <p className="text-xl font-semibold">{post.title ?? 'Untitled'}</p>
            <p className="mt-3 text-base text-neutral-500">{post.summary}</p>
          </div>
        </div>
      </Link>
      <div className="px-2 pb-4 pt-2">
        {post.tags?.map(tag => <Tag key={tag} tag={tag} />)}
      </div>
    </article>
  )
}

function Blog({posts}: {posts: FrontmatterType[]}) {
  return (
    <Layout pageName="Blog" header={false}>
      <div className="relative px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-lg font-semibold text-pink-300">Blog</h1>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Tales from the script
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-xl text-neutral-500">
              What&apos;s worse, life without fiber internet or developing on
              windows? Join me to tackle the tough questions.
            </p>
          </div>
          <Grid className="mt-12">
            {posts.length
              ? posts.map(post => <PostCard key={post.slug} post={post} />)
              : null}
          </Grid>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const posts = getAllFilesFrontmatter('posts')
  return {props: {posts}}
}

export default Blog
