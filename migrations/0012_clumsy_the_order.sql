ALTER TABLE "organizations" ADD COLUMN "owner_id" text;--> statement-breakpoint
CREATE INDEX "id_organization_index" ON "organizations" USING btree ("id");--> statement-breakpoint
CREATE INDEX "id_org_owner_index" ON "organizations" USING btree ("owner_id");