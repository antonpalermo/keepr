import { relations, sql } from "drizzle-orm"
import {
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
  text,
  integer,
  primaryKey,
  boolean,
  jsonb,
  pgEnum
} from "drizzle-orm/pg-core"

export const roleEnum = pgEnum("role", ["admin", "user"])

export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    role: roleEnum(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image")
  },
  table => [
    index("email_search_index").using(
      "gin",
      sql`to_tsvector('english', ${table.email})`
    )
  ]
)

export const accounts = pgTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state")
  },
  account => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId]
      })
    }
  ]
)

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull()
})

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull()
  },
  verificationToken => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token]
      })
    }
  ]
)

export const authenticators = pgTable(
  "authenticators",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports")
  },
  authenticator => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID]
      })
    }
  ]
)

export const asset = pgTable(
  "assets",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar({ length: 256 }),
    quantity: integer("quantity").notNull().default(1),
    assignee: text()
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),
    dateCreated: timestamp().defaultNow(),
    dateUpdated: timestamp().default(sql`now()`)
  },
  table => [
    index("id_asset_index").on(table.id),
    uniqueIndex("id_asset_unique_index").on(table.id)
  ]
)

export const logger = pgTable(
  "logs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    code: integer(),
    data: jsonb(),
    message: text()
  },
  table => [index("id_log_index").on(table.id)]
)

export const userRelations = relations(users, ({ many }) => ({
  organizations: many(organizations)
}))

export const organizations = pgTable(
  "organizations",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar({ length: 256 }),
    owner: text("owner"),
    dateCreated: timestamp().defaultNow(),
    dateUpdated: timestamp().default(sql`now()`)
  },
  table => [
    index("id_organization_index").on(table.id),
    index("id_org_owner_index").on(table.owner)
  ]
)

export const organizationRalations = relations(organizations, ({ one }) => ({
  owner: one(users, {
    fields: [organizations.owner],
    references: [users.email]
  })
}))
