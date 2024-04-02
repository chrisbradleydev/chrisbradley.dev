import {httpBatchLink, loggerLink} from '@trpc/client'
import {createTRPCNext} from '@trpc/next'
import type {inferRouterInputs, inferRouterOutputs} from '@trpc/server'
import type {AppRouter} from '~/server/api'
import {transformer} from './transformer'

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return ''
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return `http://localhost:${process.env.PORT ?? 3000}`
}

// https://trpc.io/docs/v11/react#3-create-trpc-hooks
export const trpc = createTRPCNext<AppRouter>({
  config({ctx}) {
    return {
      // https://trpc.io/docs/v11/client/links
      links: [
        loggerLink({
          enabled: opts =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (!ctx?.req?.headers) {
              return {}
            }
            const {connection: _connection, ...headers} = ctx.req.headers
            return headers
          },
          transformer,
        }),
      ],
      // https://tanstack.com/query/v5/docs/reference/QueryClient
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  // https://trpc.io/docs/v11/ssr
  ssr: false,
  // https://trpc.io/docs/v11/data-transformers
  transformer,
})

// inference helper for inputs
export type RouterInput = inferRouterInputs<AppRouter>

// inference helper for outputs
export type RouterOutput = inferRouterOutputs<AppRouter>
