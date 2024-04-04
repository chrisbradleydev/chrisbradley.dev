import {DrizzleAdapter} from '@auth/drizzle-adapter'
import {type GetServerSidePropsContext} from 'next'
import {getServerSession, type NextAuthOptions} from 'next-auth'
import type {Adapter} from 'next-auth/adapters'
import GitHubProvider from 'next-auth/providers/github'
import {db} from '~/server/db'
import {createTable} from '~/server/db/schema'
import {env} from '~/server/env'

// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  theme: {
    colorScheme: 'dark',
  },
  callbacks: {
    signIn() {
      return true
    },
    redirect({url, baseUrl}) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    session({session}) {
      return session
    },
    jwt({token}) {
      return token
    },
  },
}

// https://next-auth.js.org/configuration/nextjs
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
