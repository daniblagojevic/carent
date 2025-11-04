import { NextRequest } from "next/server";
import { db } from "@/db";
import { vehicles as getVehicles } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const bodyType = searchParams.get("bodyType"); // optional parameter


    const vehicles = await db
        .select()
        .from(getVehicles)
        .where(bodyType ? eq(getVehicles.bodyType, bodyType) : undefined)
        .orderBy(asc(getVehicles.price));

    return new Response(JSON.stringify(vehicles), {
        headers: { "Content-Type": "application/json" },
    });
}
