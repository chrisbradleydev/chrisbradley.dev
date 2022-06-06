import Head from 'next/head'
import Layout, {projectName} from '../components/layout'

function Home() {
  return (
    <Layout home>
      <Head>
        <title>{projectName}</title>
      </Head>
      <section className="h-screen">
        <div />
      </section>
    </Layout>
  )
}

export default Home
