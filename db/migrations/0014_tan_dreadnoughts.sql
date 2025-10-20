ALTER TABLE "orders" RENAME COLUMN "start_date" TO "pickup_date";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "start_time" TO "pickup_time";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "end_date" TO "return_date";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "end_time" TO "return_time";