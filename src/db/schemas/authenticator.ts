import * as orm from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"

import { user } from "./user"
import { timestamp } from "./timestamp"

export const authenticator = orm.pgTable(
  "authenticators",
  {
    id: orm
      .text()
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    credentialID: orm.text("credential_id").notNull().unique(),
    userId: orm
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    providerAccountId: orm.text("provider_account_id").notNull(),
    credentialPublicKey: orm.text("credential_public_key").notNull(),
    counter: orm.integer("counter").notNull(),
    credentialDeviceType: orm.text("credential_device_type").notNull(),
    credentialBackedUp: orm.boolean("credential_backed_up").notNull(),
    transports: orm.text("transports"),
    ...timestamp
  },
  authenticator => [
    {
      compositePK: orm.primaryKey({
        columns: [authenticator.userId, authenticator.credentialID]
      })
    }
  ]
)
