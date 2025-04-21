import * as orm from "drizzle-orm/pg-core"

export const timestamp = {
  dateDeleted: orm.timestamp("date_deleted"),
  dateCreated: orm.timestamp("date_created").defaultNow().notNull(),
  dateUpdated: orm
    .timestamp("date_updated")
    .defaultNow()
    .$onUpdateFn(() => new Date())
}
