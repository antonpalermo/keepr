import * as orm from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { user } from "./user"
import { timestamp } from "./timestamp"

export const session = orm.pgTable("sessions", {
  id: orm
    .text()
    .notNull()
    .$defaultFn(() => createId()),
  sessionToken: orm.text("session_token").primaryKey(),
  userId: orm
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: orm.timestamp("expires", { mode: "date" }).notNull(),
  ...timestamp
})
