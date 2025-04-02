CREATE TABLE "accounts" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "authenticators" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticators_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assets" DROP CONSTRAINT "assets_id_unique";--> statement-breakpoint
DROP INDEX "id_index";--> statement-breakpoint
DROP INDEX "id_unique_index";--> statement-breakpoint
ALTER TABLE "assets" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "assets" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "assets" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "assets" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authenticators" ADD CONSTRAINT "authenticators_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "id_user_index" ON "users" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "id_user_unique_index" ON "users" USING btree ("id");--> statement-breakpoint
CREATE INDEX "email_index" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "email_unique_index" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "id_asset_index" ON "assets" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "id_asset_unique_index" ON "assets" USING btree ("id");