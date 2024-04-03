import {createTRPCRouter, publicProcedure} from '~/server/api/trpc'
import {db} from '~/server/db'
import {users} from '~/server/db/schema'

import {z} from 'zod'

export const userRouter = createTRPCRouter({
  all: publicProcedure.input(z.object({})).query(async () => {
    return db.select().from(users)
  }),
})
