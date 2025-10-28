"use client";

import VehicleList from "@/components/vehicleList";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchResults() {
    const router = useRouter();

    let location = useCartStore((state) => state.pickupLocation);
    let date = useCartStore((state) => state.pickupDate);
    let time = useCartStore((state) => state.pickupTime);

    const { pickupDate, returnDate } = useCartStore();

    useEffect(() => {
        if (!pickupDate) {
            //router.replace("/");
            console.log("go back: " + pickupDate);
        } else {
            console.log("dont back: " + pickupDate);
        }
    }, [pickupDate]);

    return (
        <>
            <section>
                <div className="py-6 md:py-12">
                    <div className="container">
                        <div className="text-center pb-12">
                            <h1 className="h2">Select a vehicle group</h1>
                        </div>
                        <div>
                            <VehicleList />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
