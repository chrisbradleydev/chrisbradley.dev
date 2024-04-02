import {relations} from 'drizzle-orm'
import {
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
    userId: varchar('userId', {length: 255})
      .notNull()
      .references(() => users.id, {onDelete: 'cascade'}),
    createdAt: timestamp('created_at', {mode: 'date'}).defaultNow(),
    updatedAt: timestamp('updated_at', {mode: 'date'}).$defaultFn(
      () => new Date(),
    ),
    type: varchar('type', {length: 255})
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', {length: 255}).notNull(),
    providerAccountId: varchar('providerAccountId', {length: 255}).notNull(),
    refreshToken: text('refresh_token'),
    accessToken: text('access_token'),
    expiresAt: integer('expires_at'),
    tokenType: varchar('token_type', {length: 255}),
    scope: varchar('scope', {length: 255}),
    idToken: text('id_token'),
    sessionState: varchar('session_state', {length: 255}),
  },
  t => ({
    compoundKey: primaryKey({columns: [t.provider, t.providerAccountId]}),
  }),
)

export const accountsRelations = relations(accounts, ({one}) => ({
  user: one(users, {fields: [accounts.userId], references: [users.id]}),
}))

export const roleEnum = pgEnum('role', ['admin', 'user'])

export const users = createTable('user', {
  id: varchar('id', {length: 255}).notNull().primaryKey(),
  createdAt: timestamp('created_at', {mode: 'date'}).defaultNow(),
  updatedAt: timestamp('updated_at', {mode: 'date'}).$defaultFn(
    () => new Date(),
  ),
  name: varchar('name', {length: 255}),
  email: varchar('email', {length: 255}).notNull().unique(),
  emailVerified: timestamp('emailVerified', {mode: 'date'}),
  image: varchar('image', {length: 255}),
  role: roleEnum('role').default('user'),
})

export const usersRelations = relations(users, ({many}) => ({
  accounts: many(accounts),
}))

export const sessions = createTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: varchar('userId', {length: 255})
    .notNull()
    .references(() => users.id, {onDelete: 'cascade'}),
  expires: timestamp('expires', {mode: 'date'}).notNull(),
})

export const verificationTokens = createTable(
  'verificationToken',
  {
    identifier: varchar('identifier', {length: 255}).notNull(),
    token: varchar('token', {length: 255}).notNull(),
    expires: timestamp('expires', {mode: 'date'}).notNull(),
  },
  t => ({
    compoundKey: primaryKey({columns: [t.identifier, t.token]}),
  }),
)
