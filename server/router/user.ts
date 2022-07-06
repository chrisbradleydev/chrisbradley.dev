import {prisma} from '../db/client'
import {createRouter} from './context'

export const userRouter = createRouter().query('getAll', {
  async resolve() {
    return await prisma.user.findMany()
  },
})
