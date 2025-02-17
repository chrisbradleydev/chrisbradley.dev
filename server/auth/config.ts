import {DrizzleAdapter} from '@auth/drizzle-adapter'
import {type DefaultSession, type NextAuthConfig} from 'next-auth'
import type {Adapter} from 'next-auth/adapters'
import GitHubProvider from 'next-auth/providers/github'
import {env} from '~/env'
import {db} from '~/server/db'
import {accounts, sessions, users, verificationTokens} from '~/server/db/schema'

enum UserRole {
  Admin = 'admin',
  User = 'user',
}

// https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {id: string; role: UserRole} & DefaultSession['user']
  }

  interface User {
    role: UserRole
  }
}

// https://next-auth.js.org/configuration/options#session
export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  providers: [
    GitHubProvider({clientId: env.GITHUB_ID, clientSecret: env.GITHUB_SECRET}),
  ],
  session: {
    strategy: 'database',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  theme: {colorScheme: 'dark'},
  callbacks: {
    session({session, user}) {
      return {...session, user: {...session.user, id: user.id, role: user.role}}
    },
  },
  trustHost: true,
} satisfies NextAuthConfig
