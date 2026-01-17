import {relations, sql} from 'drizzle-orm'
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import type {AdapterAccount} from 'next-auth/adapters'

// https://orm.drizzle.team/docs/goodies#multi-project-schema
export const tablePrefix = 'cbd_prod_'
export const createTable = pgTableCreator(name => `${tablePrefix}${name}`)

export const accounts = createTable(
  'account',
  {
    userId: varchar('user_id', {length: 255})
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at', {withTimezone: true})
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).$onUpdate(
      () => new Date(),
    ),
    type: varchar('type', {length: 255})
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', {length: 255}).notNull(),
    providerAccountId: varchar('provider_account_id', {length: 255}).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', {length: 255}),
    scope: varchar('scope', {length: 255}),
    id_token: text('id_token'),
    session_state: varchar('session_state', {length: 255}),
  },
  t => [
    primaryKey({columns: [t.provider, t.providerAccountId]}),
    index('account_user_id_idx').on(t.userId),
  ],
)

export const accountsRelations = relations(accounts, ({one}) => ({
  user: one(users, {fields: [accounts.userId], references: [users.id]}),
}))

export const roleEnum = pgEnum('role', ['admin', 'user'])

export const users = createTable('user', {
  id: varchar('id', {length: 255})
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp('created_at', {withTimezone: true})
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', {withTimezone: true}).$onUpdate(
    () => new Date(),
  ),
  name: varchar('name', {length: 255}),
  email: varchar('email', {length: 255}).notNull().unique(),
  emailVerified: timestamp('email_verified', {
    mode: 'date',
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar('image', {length: 255}),
  role: roleEnum().default('user'),
})

export const usersRelations = relations(users, ({many}) => ({
  accounts: many(accounts),
}))

export const sessions = createTable(
  'session',
  {
    sessionToken: varchar('session_token', {length: 255})
      .notNull()
      .primaryKey(),
    userId: varchar('user_id', {length: 255})
      .notNull()
      .references(() => users.id),
    expires: timestamp('expires', {mode: 'date', withTimezone: true}).notNull(),
  },
  t => [index('session_user_id_idx').on(t.userId)],
)

export const sessionsRelations = relations(sessions, ({one}) => ({
  user: one(users, {fields: [sessions.userId], references: [users.id]}),
}))

export const verificationTokens = createTable(
  'verification_token',
  {
    identifier: varchar('identifier', {length: 255}).notNull(),
    token: varchar('token', {length: 255}).notNull(),
    expires: timestamp('expires', {mode: 'date', withTimezone: true}).notNull(),
  },
  t => [primaryKey({columns: [t.identifier, t.token]})],
)
