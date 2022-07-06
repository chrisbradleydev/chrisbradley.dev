import * as trpcNext from '@trpc/server/adapters/next'
import {appRouter} from '../../../server/router'
import {createContext} from '../../../server/router/context'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({error}) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error(error)
    }
  },
  batching: {enabled: true},
})
