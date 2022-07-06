import type {GetServerSideProps} from 'next'
import {useSession} from 'next-auth/react'
import Layout from '../components/layout'
import {getSession} from '../utils/session'

function Uno() {
  const {status, data: session} = useSession()
  console.log(status, session)
  return (
    <Layout pageName="Uno">
      <div />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      session: await getSession(context),
    },
  }
}

export default Uno
