import type {Config} from 'drizzle-kit'
import {env} from './env'
import {tablePrefix} from './server/db/schema'

const connectionString =
  env.NODE_ENV === 'production' ? env.POSTGRES_URL : env.DATABASE_URL

export default {
  schema: './server/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
  tablesFilter: [`${tablePrefix}*`],
} satisfies Config
