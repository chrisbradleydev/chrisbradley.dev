import GitHub from '~/components/github'
import Hero from '~/components/hero'
import Layout from '~/components/layout'

function Home() {
  return (
    <Layout pageName="Home" header={false}>
      <Hero />
      <div>
        <GitHub />
      </div>
    </Layout>
  )
}

export default Home
