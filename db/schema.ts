import { pgTable, serial, varchar, boolean, timestamp, integer, text, decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// to je primer iz https://www.youtube.com/watch?v=tiSm8ZjFQP0
// potem spremeni na svoje tabele

/*
export const customers = pgTable("customers", {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name").notNull(),
    lastName: varchar("last_name").notNull(),
    email: varchar("email").notNull().unique(),
    phone: varchar("phone").notNull().unique(),
    address1: varchar("address1").notNull(),
    address2: varchar("address2"),
    city: varchar("city").notNull(),
    postcode: varchar("postcode", { length: 10 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").notNull().references(() => customers.id).unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    passwordHash: varchar("password_hash").notNull(),
    // you could also store OAuth provider IDs here
    updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});
*/

export const vehicles = pgTable("vehicles", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    doors: integer("doors").notNull(),
    seats: integer("seats").notNull(),
    luggage: integer("luggage").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(), 
    image: varchar("image").notNull(),
    description: text("description"),
    transmission: varchar("transmission").notNull(),
    fuelType: varchar("fuel_type").notNull(),
    bodyType: varchar("body_type").notNull(),
    available: boolean("available").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    vehicleId: integer("vehicle_id").notNull().references(() => vehicles.id),
    vehicleName: varchar("vehicle_name").notNull(),
    vehicleImage: varchar("vehicle_image").notNull(),
    vehiclePrice: decimal("vehicle_price", { precision: 10, scale: 2 }).notNull(),

    // Relationship fields
    //customerId: integer("customer_id").notNull().references(() => customers.id),
    //userId: integer("user_id").notNull().references(() => users.id),

    // Order details
    pickupDate: timestamp("pickup_date").notNull(),
    pickupTime: varchar("pickup_time").notNull(),
    returnDate: timestamp("return_date").notNull(),
    returnTime: varchar("return_time").notNull(),
    pickupLocation: varchar("pickup_location").notNull(),
    returnLocation: varchar("return_location").notNull(),

    // order total
    total: decimal("total", { precision: 10, scale: 2 }).notNull(),

    // Order status
    status: varchar("status", { length: 20 }).default("processing").notNull(),
    // possible values: 'processing', 'failed', 'completed', 'cancelled'


    // Customer info 
    firstName: varchar("first_name").notNull(),
    lastName: varchar("last_name").notNull(),
    email: varchar("email").notNull(),
    phone: varchar("phone").notNull(),
    address1: varchar("address1").notNull(),
    city: varchar("city").notNull(),
    postcode: varchar("postcode", { length: 10 }).notNull(),
    country: varchar("country").notNull(),

    // Payment info
    stripeId: varchar("stripe_id"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const orderItems = pgTable("order_items", {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").notNull().references(() => orders.id),

    name: varchar("name").notNull(),
    quantity: integer("quantity").default(1).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    total: decimal("total", { precision: 10, scale: 2 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// relations

export const vehiclesRelations = relations(vehicles, ({ many }) => ({
    orders: many(orders), // one vehicle can have many orders
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
    vehicle: one(vehicles, {
        fields: [orders.vehicleId],
        references: [vehicles.id],
    }),
    orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
}));