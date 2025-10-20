"use client";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import Link from "next/link";

type VehicleProps = {
    type: string;
    text: string;
}

export default function vehicleTripDetails({ type, text }: VehicleProps) {

    let location = null;
    let date = null;
    let time = null;
    let formattedDate = null;

    if (type == "pickup") {
        location = useCartStore((state) => state.pickupLocation);
        date = useCartStore((state) => state.pickupDate);
        time = useCartStore((state) => state.pickupTime);
        if (date) {
            formattedDate = new Date(date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        }
    } else {
        location = useCartStore((state) => state.returnLocation);
        date = useCartStore((state) => state.returnDate);
        time = useCartStore((state) => state.returnTime);
        if (date) {
            formattedDate = new Date(date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        }
    }

    return (
        <>
            <div className="bg-lotion rounded-xl p-8">
                <div className="pb-1 font-semibold">{text}</div>
                <div className="">
                    <div className="text-gray-500">Date: <Link href="/" className="text-majorelle-600 font-bold hover:underline" scroll={true}>{formattedDate} at {time}</Link></div>
                </div>
                <div className="">
                    <div className="text-gray-500">Location: <Link href="/" className="text-majorelle-600 font-bold hover:underline" scroll={true}>{location}</Link></div>
                </div>
            </div>
        </>
    );
}