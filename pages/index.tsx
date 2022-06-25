import Layout from '../components/layout'
import {trpc} from '../utils/trpc'

function Home() {
  const usersQuery = trpc.useQuery(['users'])
  return (
    <Layout pageName="Home">
      <ul>
        {usersQuery.data?.map(user => (
          <li key={user.id}>{`${user.first_name} ${user.last_name}`}</li>
        ))}
      </ul>
    </Layout>
  )
}

export default Home
