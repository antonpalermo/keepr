ALTER TABLE "organizations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "organizations" CASCADE;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "date_updated" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assets" ALTER COLUMN "date_updated" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "authenticators" ALTER COLUMN "date_updated" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "logs" ALTER COLUMN "date_updated" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "date_updated" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tenants" ALTER COLUMN "date_updated" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "date_updated" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "verification_tokens" ALTER COLUMN "date_updated" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tenants" ADD COLUMN "members" jsonb DEFAULT '[]'::jsonb;