import * as orm from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"

import { user } from "./user"
import { timestamp } from "./timestamp"

export const account = orm.pgTable(
  "accounts",
  {
    id: orm
      .text()
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: orm
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: orm.text("type").notNull(),
    provider: orm.text("provider").notNull(),
    providerAccountId: orm.text("provider_account_id").notNull(),
    refresh_token: orm.text("refresh_token"),
    access_token: orm.text("access_token"),
    expires_at: orm.integer("expires_at"),
    token_type: orm.text("token_type"),
    scope: orm.text("scope"),
    id_token: orm.text("id_token"),
    session_state: orm.text("session_state"),
    ...timestamp
  },
  account => [
    {
      compoundKey: orm.primaryKey({
        columns: [account.provider, account.providerAccountId]
      })
    }
  ]
)
