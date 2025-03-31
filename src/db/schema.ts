import { sql } from "drizzle-orm"
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

export const asset = pgTable("assets", {
  id: uuid().default(sql`gen_random_uuid()`),
  name: varchar({ length: 256 }),
  dateCreated: timestamp().defaultNow(),
  dateUpdated: timestamp().default(sql`now()`)
})
