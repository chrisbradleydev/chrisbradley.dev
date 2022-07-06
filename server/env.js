// @ts-check
const {z} = require('zod')

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production']),
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
  console.error(
    'Invalid environment variables:',
    JSON.stringify(env.error.format(), null, 2),
  )
  process.exit(1)
}

module.exports.env = env.data
