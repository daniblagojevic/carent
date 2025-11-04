import { NextResponse } from "next/server";
import { db } from "@/db";
import { vehicles as getVehicles } from "@/db/schema";

export async function GET() {
    try {
        const bodyTypes = await db
            .select({ bodyType: getVehicles.bodyType })
            .from(getVehicles)
            .groupBy(getVehicles.bodyType);

        return NextResponse.json(bodyTypes.map((b) => b.bodyType));
    } catch (err) {
        console.error("Error fetching body types:", err);
        return NextResponse.json(
            { error: "Failed to fetch body types" },
            { status: 500 }
        );
    }
}
