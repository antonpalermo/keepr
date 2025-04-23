import * as orm from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"

import { timestamp } from "./timestamp"

export const user = orm.pgTable(
  "users",
  {
    id: orm
      .text()
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: orm.text(),
    email: orm.text().unique(),
    emailVerified: orm.timestamp("email_verified", { mode: "date" }),
    image: orm.text(),
    ...timestamp
  },
  table => [
    orm.index("users_id_index").on(table.id),
    orm.index("users_email_index").on(table.email),
    orm.uniqueIndex("users_email_unique_index").on(table.email)
  ]
)
