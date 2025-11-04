"use client";

import VehicleList from "@/components/vehicleList";
//import { useCartStore } from "@/store/cartStore";
//import { useRouter } from "next/navigation";
//import { useEffect, useState } from "react";

export default function SearchResults() {
    
    /*
    const router = useRouter();
    
    const pickupDate = useCartStore((state) => state.pickupDate);
    const returnDate = useCartStore((state) => state.returnDate);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const unsub = useCartStore.persist.onFinishHydration(() => {
            setHydrated(true);
        });

        // In case it’s already hydrated
        if (useCartStore.persist.hasHydrated()) {
            setHydrated(true);
        }

        return unsub;
    }, []);

    // Once hydrated, perform redirect check
    useEffect(() => {
        if (!hydrated) return;

        if (!pickupDate || !returnDate) {
            router.replace("/"); // redirect
        }
    }, [hydrated, pickupDate, returnDate, router]);

    // Avoid flicker before hydration finishes
    if (!hydrated) {
        return null; // or a loading spinner
    }
    */

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
