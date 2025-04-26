import * as orm from "drizzle-orm"
import * as pgCore from "drizzle-orm/pg-core"

import { createId } from "@paralleldrive/cuid2"

import { timestamp } from "./timestamp"
import { user } from "./user"

export const tenant = pgCore.pgTable(
  "tenants",
  {
    id: pgCore
      .text()
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: pgCore.text().notNull(),
    owner: pgCore.text().notNull(),
    ...timestamp
  },
  table => [
    pgCore.index("tenants_id_index").on(table.id),
    pgCore.index("tenants_owner_index").on(table.owner)
  ]
)

export const tenantRelations = orm.relations(tenant, ({ one }) => ({
  owner: one(user, {
    fields: [tenant.owner],
    references: [user.email]
  })
}))
