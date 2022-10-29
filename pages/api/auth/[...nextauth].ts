import {PrismaAdapter} from '@next-auth/prisma-adapter'
import NextAuth, {NextAuthOptions} from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import {prisma} from '../../../server/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  theme: {
    colorScheme: 'dark',
  },
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      return true
    },
    async redirect({url, baseUrl}) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async session({session, token, user}) {
      return session
    },
    async jwt({token, user, account, profile, isNewUser}) {
      return token
    },
  },
}

export default NextAuth(authOptions)
