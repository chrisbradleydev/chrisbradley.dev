import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const userData = {
  name: 'Chris Bradley',
  email: 'contact@chrisbradley.dev',
  image: 'https://avatars.githubusercontent.com/u/11767079?v=4',
  role: 'user',
}

async function seed() {
  await prisma.user.delete({where: {email: userData.email}}).catch(() => {})
  await prisma.user.create({data: userData})
}

// seed()
//   .catch(error => {
//     console.error(error)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
