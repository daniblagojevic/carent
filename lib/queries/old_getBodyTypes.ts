import { db } from "@/db";
import { vehicles as getVehicles } from "@/db/schema";

export async function getBodyTypes() {
    const bodyTypes = await db
        .select({ bodyType: getVehicles.bodyType })
        .from(getVehicles)
        .groupBy(getVehicles.bodyType);

    return bodyTypes.map(b => b.bodyType);
}
