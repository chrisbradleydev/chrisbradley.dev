import {BreadcrumbJsonLd} from '~/components/json-ld'
import Layout from '~/components/layout'
import Tag from '~/components/tag'
import {fullName} from '~/content/metadata'
import {getAllTags, TagsCount} from '~/utils/tags'

function Tags({tags}: {tags: TagsCount}) {
  const sortedTags = Object.keys(tags ?? {}).sort(
    (a, b) => (tags[b] ?? 0) - (tags[a] ?? 0),
  )

  const name = 'Tags'
  const url = '/tags'
  const heading = 'Find what you seek'

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {name: 'Home', url: '/'},
          {name, url},
        ]}
      />
      <Layout
        pageName={name}
        header={false}
        seo={{
          url,
          description: `${heading} - Browse content by tag on ${fullName}'s website.`,
        }}
      >
        <div className="px-4 pt-12 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
          <div className="text-center">
            <h1 className="text-lg font-semibold text-pink-300">{name}</h1>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {heading}
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
    </>
  )
}

export function getStaticProps() {
  const tags: TagsCount = {
    ...getAllTags('posts'),
    ...getAllTags('quotes'),
  }
  return {props: {tags}}
}

export default Tags
