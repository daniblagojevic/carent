"use client";

import { useCartStore } from "@/store/cartStore";
import { useState, useEffect, ReactElement } from "react";
import VehicleTripDetails from "./vehicleTripDetails";
import Link from "next/link";
import { getRentalDays } from "@/lib/functions";

type VehicleData = {
    id: number;
    name: string;
    image: string;
    transmission: string;
    doors: string;
    fuelType: string;
    bodyType: string;
    seats: number;
    price: number;
};

export default function ReviewOrder() {

    const { vehicle, cartItems, pickupDate, returnDate } = useCartStore();
    const total = useCartStore((state) => state.getTotal() ?? 0);

    const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

    // fetch additional details

    useEffect(() => {
        if (!vehicle) return;

        const fetchVehicle = async () => {
            try {
                const res = await fetch(`/api/vehicles/${vehicle.id}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch vehicle data");
                }

                const data: VehicleData = await res.json();
                setVehicleData(data);
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            } finally {
            }
        };
        fetchVehicle();

    }, [vehicle]);

    // vehicle details

    let items: { text: string; icon: ReactElement }[] = [];

    if (vehicleData) {
        items = [
            {
                text: vehicleData.transmission,
                icon: (<svg viewBox="0 0 24 24" className="h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M2 4C2 2.89543 2.89543 2 4 2C5.10457 2 6 2.89543 6 4C6 4.83934 5.48296 5.55793 4.75 5.85462V11.25H11.25V5.85462C10.517 5.55793 10 4.83934 10 4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4C14 4.83934 13.483 5.55793 12.75 5.85462V11.25H16C16.964 11.25 17.6116 11.2484 18.0946 11.1835C18.5561 11.1214 18.7536 11.0142 18.8839 10.8839C19.0142 10.7536 19.1214 10.5561 19.1835 10.0946C19.2484 9.61157 19.25 8.96401 19.25 8V5.85462C18.517 5.55793 18 4.83934 18 4C18 2.89543 18.8954 2 20 2C21.1046 2 22 2.89543 22 4C22 4.83934 21.483 5.55793 20.75 5.85462V8.05199C20.75 8.95048 20.7501 9.6997 20.6701 10.2945C20.5857 10.9223 20.4 11.4891 19.9445 11.9445C19.4891 12.4 18.9223 12.5857 18.2945 12.6701C17.6997 12.7501 16.9505 12.75 16.052 12.75L12.75 12.75L12.75 18.1454C13.483 18.4421 14 19.1607 14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20C10 19.1607 10.517 18.4421 11.25 18.1454V12.75H4.75V18.1454C5.48296 18.4421 6 19.1607 6 20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20C2 19.1607 2.51704 18.4421 3.25 18.1454V5.85462C2.51704 5.55793 2 4.83934 2 4Z" fill="#000000" /> <path fillRule="evenodd" clipRule="evenodd" d="M17.25 15C17.25 14.5858 17.5858 14.25 18 14.25H20.2857C21.6612 14.25 22.75 15.3839 22.75 16.75C22.75 17.8285 22.0713 18.7624 21.1086 19.1077L22.6396 21.6084C22.8559 21.9616 22.7449 22.4234 22.3916 22.6396C22.0384 22.8559 21.5766 22.7449 21.3604 22.3916L19.4369 19.25H18.75V22C18.75 22.4142 18.4142 22.75 18 22.75C17.5858 22.75 17.25 22.4142 17.25 22V15ZM18.75 17.75H20.2857C20.8038 17.75 21.25 17.3169 21.25 16.75C21.25 16.1831 20.8038 15.75 20.2857 15.75H18.75V17.75Z" fill="#000000" /> </g></svg>)
            },
            {
                text: vehicleData.fuelType,
                icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-5" viewBox="0 0 640 640"><path fill="#000000" d="M96 128C96 92.7 124.7 64 160 64L320 64C355.3 64 384 92.7 384 128L384 320L392 320C440.6 320 480 359.4 480 408L480 440C480 453.3 490.7 464 504 464C517.3 464 528 453.3 528 440L528 286C500.4 278.9 480 253.8 480 224L480 164.5L454.2 136.2C445.3 126.4 446 111.2 455.8 102.3C465.6 93.4 480.8 94.1 489.7 103.9L561.4 182.7C570.8 193 576 206.4 576 220.4L576 440C576 479.8 543.8 512 504 512C464.2 512 432 479.8 432 440L432 408C432 385.9 414.1 368 392 368L384 368L384 529.4C393.3 532.7 400 541.6 400 552C400 565.3 389.3 576 376 576L104 576C90.7 576 80 565.3 80 552C80 541.5 86.7 532.7 96 529.4L96 128zM160 144L160 240C160 248.8 167.2 256 176 256L304 256C312.8 256 320 248.8 320 240L320 144C320 135.2 312.8 128 304 128L176 128C167.2 128 160 135.2 160 144z" /></svg>)
            },
            {
                text: vehicleData.doors.toString() + " doors",
                icon: (<svg fill="#000000" viewBox="0 0 24 24" className="h-5" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path id="primary" d="M19,2H12.41A2,2,0,0,0,11,2.59L3.59,10A2,2,0,0,0,3,11.41V20a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V4A2,2,0,0,0,19,2Zm0,8H6.41l6-6H19Z" className="fill-current" /><path id="secondary" d="M18,14H15a1,1,0,0,1,0-2h3a1,1,0,0,1,0,2Z" className="fill-current" /></g></svg>)
            },
        ];
    }

    return (
        <>
            <div>
                {vehicleData && (
                    <div className="bg-lotion rounded-xl p-8 mb-6">
                        <h4 className="pb-4">Vehicle</h4>
                        <div className="grid grid-cols-12 gap-6 items-center">
                            <div className="col-span-5 space-y-1">
                                <h5 className="text-lg font-semibold pb-2">{vehicleData.name}</h5>
                                <div className="text-sm border rounded-full w-fit px-3 py-0">{vehicleData.bodyType}</div>
                            </div>
                            <div className="col-span-7">
                                <img
                                    src={`/vehicles/${vehicleData.image}`}
                                    alt={vehicleData.name}
                                    className="w-full h-24 object-cover rounded-xl"
                                />
                            </div>
                        </div>
                        <div className="pt-4">
                            <div className="flex flex-wrap gap-5">
                                {items.map((item, index) => (
                                    <div key={index} className="w-auto">
                                        <div className="flex items-center gap-2">
                                            <div>
                                                {item.icon}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {item.text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-lotion rounded-xl p-8 mb-6">
                    <div className="border-b border-gray-300 pb-3">
                        <h4 className="pb-4">Total</h4>
                        <ul className="space-y-2">
                            {vehicleData && (
                                <li className="flex justify-between gap-3">
                                    <div className="text-sm">{getRentalDays(String(pickupDate), String(returnDate))} rental days x ${vehicleData.price}</div>
                                    <div className="shrink-0">${(vehicleData.price * getRentalDays(String(pickupDate), String(returnDate))).toFixed(2)}</div>
                                </li>
                            )}
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex justify-between gap-3">
                                    <div className="text-sm">{item.quantity} x {item.name}</div>
                                    <div className="shrink-0">${(item.price * getRentalDays(String(pickupDate), String(returnDate)) * item.quantity).toFixed(2)}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="pt-3">
                        <div className="flex justify-between gap-3">
                            <div>
                                <h5 className="text-lg font-semibold pb-2">Total</h5>
                            </div>
                            <div>${total}</div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <VehicleTripDetails text="Pickup" type="pickup" />
                </div>

                <div className="mb-6">
                    <VehicleTripDetails text="Return" type="return" />
                </div>

            </div>
        </>
    );
}
