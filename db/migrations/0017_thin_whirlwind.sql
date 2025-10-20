ALTER TABLE "orders" ADD COLUMN "stripe_id" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_stripe_id_unique" UNIQUE("stripe_id");