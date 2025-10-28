import { pgTable, serial, varchar, boolean, timestamp, integer, text, decimal, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "@auth/core/adapters"


//////////////////////
// auth
//////////////////////

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
})

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => [
        {
            compoundKey: primaryKey({
                columns: [account.provider, account.providerAccountId],
            }),
        },
    ]
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => [
        {
            compositePk: primaryKey({
                columns: [verificationToken.identifier, verificationToken.token],
            }),
        },
    ]
)

export const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    (authenticator) => [
        {
            compositePK: primaryKey({
                columns: [authenticator.userId, authenticator.credentialID],
            }),
        },
    ]
)

//////////////////////
// vehicles
//////////////////////

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

//////////////////////
// orders
//////////////////////

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    vehicleId: integer("vehicle_id").notNull().references(() => vehicles.id),
    vehicleName: varchar("vehicle_name").notNull(),
    vehicleImage: varchar("vehicle_image").notNull(),
    vehiclePrice: decimal("vehicle_price", { precision: 10, scale: 2 }).notNull(),

    // user
    userId: text("user_id").references(() => users.id, { onDelete: "set null" }),

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

//////////////////////
// order_items
//////////////////////

export const orderItems = pgTable("order_items", {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").notNull().references(() => orders.id),

    name: varchar("name").notNull(),
    quantity: integer("quantity").default(1).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    total: decimal("total", { precision: 10, scale: 2 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});


//////////////////////
// relations
//////////////////////

export const vehiclesRelations = relations(vehicles, ({ many }) => ({
    orders: many(orders), // one vehicle can have many orders
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
    vehicle: one(vehicles, {
        fields: [orders.vehicleId],
        references: [vehicles.id],
    }),
    orderItems: many(orderItems),
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
}));