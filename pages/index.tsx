import Hero from '~/components/hero'
import Layout from '~/components/layout'
import {trpc} from '~/utils/trpc'

function Home() {
  const userQuery = trpc.user.all.useQuery({})
  const users = userQuery.data?.length ? userQuery.data : []

  return (
    <Layout pageName="Home" header={false}>
      <Hero />
      <div>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default Home
