import * as orm from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"

import { timestamp } from "./timestamp"

export const tenant = orm.pgTable(
  "tenants",
  {
    id: orm
      .text()
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: orm.text().notNull(),
    owner: orm.text().notNull(),
    ...timestamp
  },
  table => [
    orm.index("tenants_id_index").on(table.id),
    orm.index("tenants_owner_index").on(table.owner)
  ]
)
