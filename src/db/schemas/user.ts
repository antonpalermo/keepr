import * as orm from "drizzle-orm"
import * as pgCore from "drizzle-orm/pg-core"

import { createId } from "@paralleldrive/cuid2"

import { tenant } from "./tenant"
import { timestamp } from "./timestamp"

export const user = pgCore.pgTable(
  "users",
  {
    id: pgCore
      .text()
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: pgCore.text(),
    email: pgCore.text().unique(),
    emailVerified: pgCore.timestamp("email_verified", { mode: "date" }),
    image: pgCore.text(),
    ...timestamp
  },
  table => [
    pgCore.index("users_id_index").on(table.id),
    pgCore.index("users_email_index").on(table.email),
    pgCore.uniqueIndex("users_email_unique_index").on(table.email)
  ]
)

export const userRelations = orm.relations(user, ({ many }) => ({
  tenants: many(tenant)
}))
