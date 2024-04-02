import {type DefaultSession} from 'next-auth'

enum UserRole {
  Admin = 'admin',
  User = 'user',
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      role: UserRole
    } & DefaultSession['user']
  }
}
