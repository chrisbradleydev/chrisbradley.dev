import superjson from 'superjson'
import {createRouter} from '../createRouter'
import {prisma} from '../prisma'

export const appRouter = createRouter()
  .transformer(superjson)
  .query('healthz', {
    async resolve() {
      return {
        status: 'ok',
      }
    },
  })
  .query('users', {
    async resolve() {
      return await prisma.user.findMany()
    },
  })

export type AppRouter = typeof appRouter
