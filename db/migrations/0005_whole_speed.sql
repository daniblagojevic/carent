ALTER TABLE "bookings" RENAME TO "orders";--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "bookings_email_unique";--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "bookings_phone_unique";--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "bookings_vehicle_id_vehicles_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_phone_unique" UNIQUE("phone");