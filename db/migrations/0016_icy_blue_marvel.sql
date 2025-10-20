ALTER TABLE "orders" ADD COLUMN "vehicle_name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "vehicle_image" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "vehicle_price" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "total" numeric(10, 2) NOT NULL;