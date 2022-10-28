import {PrismaClient} from '@prisma/client'
import {env} from './env'

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient
}

export const prisma: PrismaClient =
  prismaGlobal.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
  })

if (env.NODE_ENV !== 'production') {
  prismaGlobal.prisma = prisma
}
