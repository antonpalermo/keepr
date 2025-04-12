CREATE TABLE "organizations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"dateCreated" timestamp DEFAULT now(),
	"dateUpdated" timestamp DEFAULT now()
);
