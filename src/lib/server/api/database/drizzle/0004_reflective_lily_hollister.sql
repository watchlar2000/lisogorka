

ALTER TABLE "projects" ALTER COLUMN "is_featured" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "public"."projects" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."category";--> statement-breakpoint

UPDATE "public"."projects"
SET category = 'paintings'
WHERE category = 'background-painting';

CREATE TYPE "public"."category" AS ENUM('paintings', 'visual-development', 'playground');--> statement-breakpoint
ALTER TABLE "public"."projects" ALTER COLUMN "category" SET DATA TYPE "public"."category" USING "category"::"public"."category";
