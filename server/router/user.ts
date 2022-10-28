import {prisma} from '../prisma'
import {baseProcedure, router} from '../trpc'

export const userRouter = router({
  all: baseProcedure.query(async () => {
    return await prisma.user.findMany()
  }),
})
