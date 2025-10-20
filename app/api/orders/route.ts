// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema"; // import your orders table
import { getRentalDays } from "@/lib/functions";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // Destructure the payload
        const {
            vehicleId,
            vehicleName,
            vehicleImage,
            vehiclePrice,
            pickupDate,
            pickupTime,
            returnDate,
            returnTime,
            pickupLocation,
            returnLocation,
            total,
            firstName,
            lastName,
            email,
            phone,
            address1,
            city,
            postcode,
            country,
            cartItems,
            stripeId,
        } = data;

        // Insert into orders table
        const [newOrder] = await db
            .insert(orders)
            .values({
                vehicleId,
                vehicleName,
                vehicleImage,
                vehiclePrice,
                pickupDate: new Date(pickupDate),
                pickupTime,
                returnDate: new Date(returnDate),
                returnTime,
                pickupLocation,
                returnLocation,
                total: total,
                firstName,
                lastName,
                email,
                phone,
                address1,
                city,
                postcode,
                country,
                status: "processing",
                stripeId,
            })
            .returning({ id: orders.id });

        // Insert order items
        if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
            const orderItemsData = cartItems.map((item) => ({
                orderId: newOrder.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: (item.price * item.quantity * getRentalDays(pickupDate, returnDate)).toFixed(2),
            }));

            await db.insert(orderItems).values(orderItemsData);
        }

        return NextResponse.json({ success: true, order: newOrder });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
