CREATE TABLE "assets" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" varchar(256),
	"dateCreated" timestamp DEFAULT now(),
	"dateUpdated" timestamp DEFAULT now()
);
