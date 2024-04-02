import {createCallerFactory, createTRPCRouter} from '~/server/api/trpc'
import {userRouter} from '~/server/router/user'

// primary router
export const appRouter = createTRPCRouter({
  user: userRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

// server-side caller for the tRPC API
export const createCaller = createCallerFactory(appRouter)
