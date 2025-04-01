CREATE TABLE "logs" (
	"id" text PRIMARY KEY NOT NULL,
	"code" integer,
	"data" jsonb,
	"message" text
);
--> statement-breakpoint
CREATE INDEX "id_log_index" ON "logs" USING btree ("id");