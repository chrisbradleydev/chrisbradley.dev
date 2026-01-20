import type {GetStaticProps} from 'next'
import GitHub, {GitHubActivityResponse} from '~/components/github'
import Hero from '~/components/hero'
import {WebSiteJsonLd} from '~/components/json-ld'
import Layout from '~/components/layout'
import activity from '~/content/github/activity.json'
import {defaultDescription, siteName, siteUrl} from '~/content/metadata'

function Home({activity}: {activity: GitHubActivityResponse}) {
  return (
    <>
      <WebSiteJsonLd
        name={siteName}
        url={siteUrl}
        description={defaultDescription}
      />
      <Layout
        pageName="Home"
        header={false}
        seo={{
          url: '/',
          description: defaultDescription,
        }}
      >
        <Hero />
        <div>
          <GitHub activity={activity} />
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = () => {
  return {props: {activity}}
}

export default Home
