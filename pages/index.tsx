import type {GetStaticProps} from 'next'
import GitHub, {GitHubActivityResponse} from '~/components/github'
import Hero from '~/components/hero'
import Layout from '~/components/layout'
import activity from '~/content/github/activity.json'

function Home({activity}: {activity: GitHubActivityResponse}) {
  return (
    <Layout pageName="Home" header={false}>
      <Hero />
      <div>
        <GitHub activity={activity} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = () => {
  return {props: {activity}}
}

export default Home
