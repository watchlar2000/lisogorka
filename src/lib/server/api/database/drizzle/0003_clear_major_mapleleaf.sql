ALTER TABLE "users" ADD COLUMN "google_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password_hash";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_google_id_unique" UNIQUE("google_id");