DROP INDEX "id_index";--> statement-breakpoint
CREATE UNIQUE INDEX "id_unique_index" ON "assets" USING btree ("id");--> statement-breakpoint
CREATE INDEX "id_index" ON "assets" USING btree ("name");