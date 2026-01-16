import {initTRPC, TRPCError} from '@trpc/server'
import type {CreateNextContextOptions} from '@trpc/server/adapters/next'
import {type Session} from 'next-auth'
import superjson from 'superjson'
import {z} from 'zod'
import {auth} from '~/server/auth'
import {db} from '~/server/db'

// context
interface CreateContextOptions {
  session: Session | null
}

// https://create.t3.gg/en/usage/trpc#-serverapitrpcts
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    db,
  }
}

// https://trpc.io/docs/context
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const {req, res} = opts

  // Get the session from the server using the getServerSession wrapper function
  const session = await auth(req, res)

  return createInnerTRPCContext({
    session,
  })
}

// initialize tRPC API
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({shape, error}) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof z.ZodError
            ? z.flattenError(error.cause)
            : null,
      },
    }
  },
})

// https://trpc.io/docs/server/server-side-calls
export const createCallerFactory = t.createCallerFactory

// https://trpc.io/docs/router
export const createTRPCRouter = t.router

// https://trpc.io/docs/procedures

export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(({ctx, next}) => {
  if (!ctx.session?.user) {
    throw new TRPCError({code: 'UNAUTHORIZED'})
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: {...ctx.session, user: ctx.session.user},
    },
  })
})
