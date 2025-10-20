import { db } from "@/db";
import { vehicles as getVehicles } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const bodyType = searchParams.get("bodyType"); // optional parameter

    let query = db.select().from(getVehicles).orderBy(asc(getVehicles.price));

    if (bodyType) {
        query = query.where(eq(getVehicles.bodyType, bodyType));
    }

    const vehicles = await query;

    return new Response(JSON.stringify(vehicles), {
        headers: { "Content-Type": "application/json" },
    });
}
