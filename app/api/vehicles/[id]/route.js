import { db } from "@/db";
import { vehicles as getVehicles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req, context) {
    // Await params first in JS files
    const params = await context.params;  
    const vehicleId = Number(params.id);

    const vehicle = await db
        .select()
        .from(getVehicles)
        .where(eq(getVehicles.id, vehicleId))
        .limit(1);

    if (!vehicle.length) {
        return new Response(JSON.stringify({ error: "Vehicle not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(vehicle[0]), {
        headers: { "Content-Type": "application/json" },
    });
}
