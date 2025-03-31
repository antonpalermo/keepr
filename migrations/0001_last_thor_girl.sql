CREATE UNIQUE INDEX "id_index" ON "assets" USING btree ("id");--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_id_unique" UNIQUE("id");