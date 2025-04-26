import * as orm from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"

import { timestamp } from "./timestamp"

export const log = orm.pgTable(
  "logs",
  {
    id: orm
      .text()
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),

    code: orm.integer(),
    data: orm.jsonb(),
    message: orm.text(),
    ...timestamp
  },
  table => [orm.index("logs_id_index").on(table.id)]
)
