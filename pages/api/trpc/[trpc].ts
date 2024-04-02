import {createNextApiHandler} from '@trpc/server/adapters/next'
import {appRouter} from '~/server/api'
import {createTRPCContext} from '~/server/api/trpc'
import {env} from '~/server/env'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({path, error}) => {
          console.error(
            `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
          )
        }
      : undefined,
})
