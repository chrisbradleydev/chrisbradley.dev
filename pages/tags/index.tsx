import Layout from '../../components/layout'
import Tag from '../../components/tag'
import {getAllTags, TagsCount} from '../../utils/tags'

function Tags({tags}: {tags: TagsCount}) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <Layout pageName="Tags" header={false}>
      <div className="px-4 pt-12 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-pink-300">Tags</h1>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find what you seek
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-xl text-neutral-500">
            To tag, or not to tag? That is the question.
          </p>
        </div>
        <div className="mt-12">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map(t => (
            <Tag key={t} tag={t} count={tags[t]} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const tags = await getAllTags('posts')
  return {props: {tags}}
}

export default Tags