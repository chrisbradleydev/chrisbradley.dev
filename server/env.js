// @ts-check
const {z} = require('zod')

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
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
