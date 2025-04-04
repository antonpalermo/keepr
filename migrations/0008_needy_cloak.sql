ALTER TABLE "assets" ADD COLUMN "quantity" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "assets" ADD COLUMN "assignee" text[] DEFAULT ARRAY[]::text[] NOT NULL;