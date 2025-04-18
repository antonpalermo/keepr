ALTER TABLE "organizations" RENAME COLUMN "owner_id" TO "owner";--> statement-breakpoint
DROP INDEX "id_org_owner_index";--> statement-breakpoint
CREATE INDEX "id_org_owner_index" ON "organizations" USING btree ("owner");