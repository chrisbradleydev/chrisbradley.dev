import type {Config} from 'drizzle-kit'
import {tablePrefix} from './server/db/schema'
import {env} from './server/env'

const connectionString =
  env.NODE_ENV === 'production' ? env.POSTGRES_URL : env.DATABASE_URL

export default {
  schema: './server/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {connectionString},
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
  tablesFilter: [`${tablePrefix}*`],
} satisfies Config
