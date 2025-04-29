import * as orm from "drizzle-orm/pg-core"

export const timestamp = {
  dateCreated: orm.timestamp("date_created").defaultNow().notNull(),
  dateUpdated: orm
    .timestamp("date_updated")
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
  dateDeleted: orm.timestamp("date_deleted")
}
