import { sql } from "drizzle-orm"
import {
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar
} from "drizzle-orm/pg-core"

export const asset = pgTable(
  "assets",
  {
    id: uuid()
      .default(sql`gen_random_uuid()`)
      .unique(),
    name: varchar({ length: 256 }),
    dateCreated: timestamp().defaultNow(),
    dateUpdated: timestamp().default(sql`now()`)
  },
  table => [
    index("id_index").on(table.id),
    uniqueIndex("id_unique_index").on(table.id)
  ]
)
