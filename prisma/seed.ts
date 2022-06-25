import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const userData = {
  email: 'contact@chrisbradley.dev',
  first_name: 'Chris',
  last_name: 'Bradley',
}

async function seed() {
  await prisma.user.delete({where: {email: userData.email}}).catch(() => {})
  await prisma.user.create({data: userData})
}

seed()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
