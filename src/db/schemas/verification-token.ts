import * as orm from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"

import { timestamp } from "./timestamp"

export const verificationToken = orm.pgTable(
  "verification_tokens",
  {
    id: orm
      .text()
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    identifier: orm.text("identifier").notNull(),
    token: orm.text("token").notNull(),
    expires: orm.timestamp("expires", { mode: "date" }).notNull(),
    ...timestamp
  },
  verificationToken => [
    {
      compositePk: orm.primaryKey({
        columns: [verificationToken.identifier, verificationToken.token]
      })
    }
  ]
)
