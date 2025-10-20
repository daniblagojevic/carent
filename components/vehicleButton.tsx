"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRentalDays } from "@/lib/functions";

type VehicleButtonProps = {
    vehicle: {
        id: number;
        name: string;
        price: number;
        image: string;
    };
};

export default function VehicleButton({ vehicle }: VehicleButtonProps) {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const setVehicle = useCartStore((state) => state.setVehicle);

    const {pickupDate, returnDate} = useCartStore();

    const handleAddToCart = () => {
        setLoading(true);

        setVehicle({
            id: vehicle.id,
            name: vehicle.name,
            price: Number(vehicle.price),
            image: vehicle.image,
        });

        setTimeout(() => {
            router.push("/extras");
            //setLoading(false);
        }, 1000); // Simulate a delay for loading state
    }

    return (
        <>
            <button type="button" className="btn btn-primary w-full" onClick={handleAddToCart}>
                {loading ? (
                    <div className="flex items-center gap-3">
                        <span className="animate-spin inline-block size-4 border-3 border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                        Loading ...
                    </div>
                ) : (
                    <div>
                        Rent - ${(Number(vehicle.price) * getRentalDays(String(pickupDate), String(returnDate))).toFixed(2)} total
                    </div>
                )}
            </button>
        </>
    );
}