import Layout from '../../components/layout'
import Tag from '../../components/tag'
import {getAllTags, TagsCount} from '../../utils/tags'

function Tags({tags}: {tags: TagsCount}) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <Layout pageName="Tags" header={false}>
      <div className="px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-pink-300">Tags</h1>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find what you seek
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-xl text-neutral-500">
            To tag, or not to tag? That is the question.
          </p>
        </div>
        <div className="mt-12 flow-root">
          <div className="-m-2 flex flex-wrap">
            {Object.keys(tags).length === 0 && (
              <div className="m-2">No tags found.</div>
            )}
            {sortedTags.map(t => (
              <Tag key={t} count={tags[t]} tag={t} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export function getStaticProps() {
  const tags = getAllTags('posts')
  return {props: {tags}}
}

export default Tags
