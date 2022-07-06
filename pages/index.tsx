import Layout from '../components/layout'
import {trpc} from '../utils/trpc'

function Home() {
  const usersQuery = trpc.useQuery(['user.getAll'])
  return (
    <Layout pageName="Home">
      <ul>
        {usersQuery.data?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </Layout>
  )
}

export default Home
