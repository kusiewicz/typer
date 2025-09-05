CREATE TABLE "match_days" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"stage_id" uuid NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"multiplier" numeric(3, 2) NOT NULL,
	CONSTRAINT "stages_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "match_day_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "match_days" ADD CONSTRAINT "match_days_stage_id_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_match_day_id_match_days_id_fk" FOREIGN KEY ("match_day_id") REFERENCES "public"."match_days"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" DROP COLUMN "stage";--> statement-breakpoint
ALTER TABLE "matches" DROP COLUMN "multiplier";