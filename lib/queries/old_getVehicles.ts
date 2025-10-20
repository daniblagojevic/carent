import { db } from "@/db";
import { vehicles } from "@/db/schema";

export async function getVehicles() {
    return await db.select().from(vehicles);
}