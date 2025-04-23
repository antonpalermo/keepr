import * as orm from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
import { createId } from "@paralleldrive/cuid2"
import { timestamp } from "./timestamp"

export const asset = orm.pgTable(
  "assets",
  {
    id: orm
      .text()
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: orm.text().notNull(),
    quantity: orm.integer().notNull().default(1),
    assignee: orm
      .text()
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),
    ...timestamp
  },
  table => [
    orm.index("assets_id_index").on(table.id),
    orm.uniqueIndex("assets_id_unique_index").on(table.id)
  ]
)
