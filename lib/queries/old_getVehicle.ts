import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getVehicle(id: number) {
    const vehicle = await db.select()
        .from(vehicles)
        .where(eq(vehicles.id, id));

    return vehicle[0] || null;
}
