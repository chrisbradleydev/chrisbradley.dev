import {sql} from '@vercel/postgres'
import {drizzle} from 'drizzle-orm/postgres-js'
import {drizzle as drizzleVercel} from 'drizzle-orm/vercel-postgres'
import postgres from 'postgres'
import {env} from '~/env'
import * as schema from './schema'

// cache the database connection in development
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined
}

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL)
if (env.NODE_ENV !== 'production') {
  globalForDb.conn = conn
}

export const db =
  env.NODE_ENV === 'production'
    ? drizzleVercel(sql, {schema})
    : drizzle(conn, {schema})
