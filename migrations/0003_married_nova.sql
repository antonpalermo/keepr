DROP INDEX "id_index";--> statement-breakpoint
CREATE INDEX "id_index" ON "assets" USING btree ("id");