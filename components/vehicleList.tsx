"use client";

import { useState, useEffect } from "react";
import VehicleCard from "@/components/vehicleCard";
import VehicleCardLoading from "@/components/vehicleCardLoading";

type Vehicle = {
    id: number;
    name: string;
    doors: number;
    seats: number;
    luggage: number;
    price: number;
    image: string;
    description?: string | null;
    transmission: string;
    fuelType: string;
    bodyType: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export default function VehicleList() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [bodyTypes, setBodyTypes] = useState<string[]>([]);
    const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);

    // Fetch all vehicles on component mount
    useEffect(() => {
        fetchVehicles();
        fetchBodyTypes();
    }, []);

    async function fetchVehicles(bodyType?: string | null) {
        setLoading(true);
        try {
            let url = "/api/vehicles";
            if (bodyType){
                url += `?bodyType=${bodyType}`;
            }
            const res = await fetch(url);
            const data = await res.json();
            setVehicles(data);
        } catch (error) {
            console.error("Failed to fetch vehicles:", error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchBodyTypes() {
        try {
            const res = await fetch("/api/body-types");
            const data = await res.json();
            setBodyTypes(data);
        } catch (error) {
            console.error("Failed to fetch body types:", error);
        }
    }

    const handleFilterClick = (bodyType: string | null) => {
        setSelectedBodyType(bodyType);
        fetchVehicles(bodyType);
    };

    return (
        <>
            {/* Body type buttons */}
            <div className="text-center pb-12 flex flex-wrap justify-center gap-3">
                <button
                    className={`px-4 py-2 rounded-full ${selectedBodyType === null
                        ? "btn btn-primary"
                        : "bg-gray-200 cursor-pointer hover:bg-gray-300"
                        }`}
                    onClick={() => handleFilterClick(null)}
                >
                    All vehicles
                </button>
                {bodyTypes.map((type) => (
                    <button
                        key={type}
                        className={`px-4 py-2 rounded-full ${selectedBodyType === type
                            ? "btn btn-primary"
                            : "bg-gray-200 cursor-pointer hover:bg-gray-300"
                            }`}
                        onClick={() => handleFilterClick(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Vehicle grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <VehicleCardLoading key={i} />
                    ))
                    : vehicles.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
            </div>
        </>
    );
}