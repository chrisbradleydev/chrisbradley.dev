import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'

interface CreateContextOptions {}

export async function createContextInner(_options: CreateContextOptions) {
  return {}
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>

export async function createContext(
  options: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  return await createContextInner({})
}