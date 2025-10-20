CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"start_time" varchar NOT NULL,
	"end_date" timestamp NOT NULL,
	"end_time" varchar NOT NULL,
	"pickup_location" varchar NOT NULL,
	"return_location" varchar NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"address1" varchar NOT NULL,
	"address2" varchar,
	"city" varchar NOT NULL,
	"postcode" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bookings_email_unique" UNIQUE("email"),
	CONSTRAINT "bookings_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"doors" integer NOT NULL,
	"seats" integer NOT NULL,
	"luggage" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"image" varchar NOT NULL,
	"description" text,
	"transmission" varchar NOT NULL,
	"fuel_type" varchar NOT NULL,
	"body_type" varchar NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;