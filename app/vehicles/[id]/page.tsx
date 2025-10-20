"use client";

import VehicleCard from "@/components/vehicleCard";
//import { db } from "@/db";
//import { vehicles } from "@/db/schema";
//import { eq, ne, and } from "drizzle-orm";
import Link from "next/link";
//import { notFound } from "next/navigation";
import { ReactElement } from "react";
import VehicleButton from "@/components/vehicleButton";
import VehicleTripDetails from "@/components/vehicleTripDetails";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useParams } from 'next/navigation';
import { getRentalDays } from "@/lib/functions";
import Loading from "@/components/loading";

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

export default function VehiclePage() {
    const params = useParams();
    const vehicleId = params.id;

    const { pickupDate, returnDate } = useCartStore();

    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [otherVehicles, setOtherVehicles] = useState<Vehicle[]>([]);

    let items: { title: string; text: string; icon: ReactElement }[] = [];


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    // get current vehicle 

    useEffect(() => {
        async function fetchVehicle() {
            try {
                const res = await fetch(`/api/vehicles/${vehicleId}`);
                if (!res.ok) throw new Error("Vehicle not found");

                const data = await res.json();
                setVehicle(data);
            } catch (error) {
                console.error(error);
            } finally {
            }
        }
        fetchVehicle();
    }, []);


    useEffect(() => {
        async function fetchOtherVehicles() {
            if (!vehicle) return;

            try {
                let url = "/api/vehicles";
                if (vehicle.bodyType) {
                    url += `?bodyType=${vehicle.bodyType}`;
                }
                const res = await fetch(url);
                const data: Vehicle[] = await res.json();

                // remove current vehicle
                const filteredVehicles = data.filter(v => v.id !== vehicle.id);
                setOtherVehicles(filteredVehicles);
            } catch (error) {
                console.error(error);
            } finally {
            }
        }
        fetchOtherVehicles();
    }, [vehicle]);

    // prepare items for technical specification

    if (vehicle) {
        items = [
            {
                text: vehicle.transmission,
                title: "Transmission",
                icon: (<svg viewBox="0 0 24 24" className="h-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M2 4C2 2.89543 2.89543 2 4 2C5.10457 2 6 2.89543 6 4C6 4.83934 5.48296 5.55793 4.75 5.85462V11.25H11.25V5.85462C10.517 5.55793 10 4.83934 10 4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4C14 4.83934 13.483 5.55793 12.75 5.85462V11.25H16C16.964 11.25 17.6116 11.2484 18.0946 11.1835C18.5561 11.1214 18.7536 11.0142 18.8839 10.8839C19.0142 10.7536 19.1214 10.5561 19.1835 10.0946C19.2484 9.61157 19.25 8.96401 19.25 8V5.85462C18.517 5.55793 18 4.83934 18 4C18 2.89543 18.8954 2 20 2C21.1046 2 22 2.89543 22 4C22 4.83934 21.483 5.55793 20.75 5.85462V8.05199C20.75 8.95048 20.7501 9.6997 20.6701 10.2945C20.5857 10.9223 20.4 11.4891 19.9445 11.9445C19.4891 12.4 18.9223 12.5857 18.2945 12.6701C17.6997 12.7501 16.9505 12.75 16.052 12.75L12.75 12.75L12.75 18.1454C13.483 18.4421 14 19.1607 14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20C10 19.1607 10.517 18.4421 11.25 18.1454V12.75H4.75V18.1454C5.48296 18.4421 6 19.1607 6 20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20C2 19.1607 2.51704 18.4421 3.25 18.1454V5.85462C2.51704 5.55793 2 4.83934 2 4Z" fill="#000000" /> <path fillRule="evenodd" clipRule="evenodd" d="M17.25 15C17.25 14.5858 17.5858 14.25 18 14.25H20.2857C21.6612 14.25 22.75 15.3839 22.75 16.75C22.75 17.8285 22.0713 18.7624 21.1086 19.1077L22.6396 21.6084C22.8559 21.9616 22.7449 22.4234 22.3916 22.6396C22.0384 22.8559 21.5766 22.7449 21.3604 22.3916L19.4369 19.25H18.75V22C18.75 22.4142 18.4142 22.75 18 22.75C17.5858 22.75 17.25 22.4142 17.25 22V15ZM18.75 17.75H20.2857C20.8038 17.75 21.25 17.3169 21.25 16.75C21.25 16.1831 20.8038 15.75 20.2857 15.75H18.75V17.75Z" fill="#000000" /> </g></svg>)
            },
            {
                text: vehicle.fuelType,
                title: "Fuel",
                icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6" viewBox="0 0 640 640"><path fill="#000000" d="M96 128C96 92.7 124.7 64 160 64L320 64C355.3 64 384 92.7 384 128L384 320L392 320C440.6 320 480 359.4 480 408L480 440C480 453.3 490.7 464 504 464C517.3 464 528 453.3 528 440L528 286C500.4 278.9 480 253.8 480 224L480 164.5L454.2 136.2C445.3 126.4 446 111.2 455.8 102.3C465.6 93.4 480.8 94.1 489.7 103.9L561.4 182.7C570.8 193 576 206.4 576 220.4L576 440C576 479.8 543.8 512 504 512C464.2 512 432 479.8 432 440L432 408C432 385.9 414.1 368 392 368L384 368L384 529.4C393.3 532.7 400 541.6 400 552C400 565.3 389.3 576 376 576L104 576C90.7 576 80 565.3 80 552C80 541.5 86.7 532.7 96 529.4L96 128zM160 144L160 240C160 248.8 167.2 256 176 256L304 256C312.8 256 320 248.8 320 240L320 144C320 135.2 312.8 128 304 128L176 128C167.2 128 160 135.2 160 144z" /></svg>)
            },
            {
                text: vehicle.doors.toString(),
                title: "Doors",
                icon: (<svg fill="#000000" viewBox="0 0 24 24" className="h-6" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path id="primary" d="M19,2H12.41A2,2,0,0,0,11,2.59L3.59,10A2,2,0,0,0,3,11.41V20a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V4A2,2,0,0,0,19,2Zm0,8H6.41l6-6H19Z" className="fill-current" /><path id="secondary" d="M18,14H15a1,1,0,0,1,0-2h3a1,1,0,0,1,0,2Z" className="fill-current" /></g></svg>)
            },
            {
                text: vehicle.seats.toString(),
                title: "Seats",
                icon: (<svg className="h-6" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g> <path className="st0" d="M399.151,0.039c-35.093-1.211-64.489,26.244-65.692,61.337c-1.219,35.093,26.245,64.507,61.33,65.718 c35.084,1.21,64.498-26.262,65.699-61.347C461.708,30.663,434.235,1.249,399.151,0.039z"></path> <path className="st0" d="M382.245,153.356c-24.019-9.49-51.188,2.279-60.661,26.324v-0.027l-50.761,126.788l-99.12-29.164 c-21.464-8.173-45.464,2.092-54.358,23.28L54.021,466.845c-6.961,16.56,0.828,35.646,17.414,42.608 c16.585,6.961,35.663-0.837,42.625-17.404l65.78-120.655l76.24,30.17c45.17,18.606,77.068,0,95.665-45.179l56.833-142.35 C418.059,190.007,406.29,162.846,382.245,153.356z"></path> </g> </g></svg>)
            },
            {
                text: vehicle.luggage.toString(),
                title: "Luggage",
                icon: (<svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#000000" d="M264 112L376 112C380.4 112 384 115.6 384 120L384 160L256 160L256 120C256 115.6 259.6 112 264 112zM208 120L208 544L432 544L432 120C432 89.1 406.9 64 376 64L264 64C233.1 64 208 89.1 208 120zM480 160L480 544L512 544C547.3 544 576 515.3 576 480L576 224C576 188.7 547.3 160 512 160L480 160zM160 544L160 160L128 160C92.7 160 64 188.7 64 224L64 480C64 515.3 92.7 544 128 544L160 544z" /></svg>)
            },
            {
                text: vehicle.bodyType.toString(),
                title: "Body",
                icon: (<svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#000000" d="M147 170.7L117.2 256L240.1 256L240.1 160L162.2 160C155.4 160 149.3 164.3 147.1 170.7zM48.6 257.9L86.5 149.6C97.8 117.5 128.1 96 162.1 96L360 96C385.2 96 408.9 107.9 424 128L520.2 256.3C587.1 260.5 640 316.1 640 384L640 400C640 435.3 611.3 464 576 464L559.6 464C555.6 508.9 517.9 544 472 544C426.1 544 388.4 508.9 384.4 464L239.7 464C235.7 508.9 198 544 152.1 544C106.2 544 68.5 508.9 64.5 464L64.1 464C28.8 464 .1 435.3 .1 400L.1 320C.1 289.9 20.8 264.7 48.7 257.9zM440 256L372.8 166.4C369.8 162.4 365 160 360 160L288 160L288 256L440 256zM152 496C174.1 496 192 478.1 192 456C192 433.9 174.1 416 152 416C129.9 416 112 433.9 112 456C112 478.1 129.9 496 152 496zM512 456C512 433.9 494.1 416 472 416C449.9 416 432 433.9 432 456C432 478.1 449.9 496 472 496C494.1 496 512 478.1 512 456z" /></svg>)
            },
        ];
    }

    return (
        <>
            {!loading ? (
                <div>
                    {vehicle && (
                        <section>
                            <div className="container py-12">
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="col-span-6">
                                        <h1 className="text-3xl font-bold mb-4">{vehicle.name}</h1>
                                        <div className="flex items-center space-x-2 mb-4">
                                            <div className="text-majorelle-600 text-3xl font-semibold">${vehicle.price}</div>
                                            <div className="text-gray-600"> / day</div>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-4 text-gray-600 text-sm">
                                            <div className="text-majorelle-600 font-medium">${(Number(vehicle.price) * getRentalDays(String(pickupDate), String(returnDate))).toFixed(2)}</div>
                                            <div className=""> / total</div>
                                        </div>
                                        <div>
                                            <img
                                                src={vehicle.image}
                                                alt={vehicle.name}
                                                className="w-full rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        <h4>Technical Specification</h4>
                                        <div className="pt-10">
                                            <div>
                                                <div className="grid grid-cols-12 gap-5">
                                                    {items.map((item, index) => (
                                                        <div key={index} className="col-span-4">
                                                            <div className="bg-lotion rounded-xl p-8">
                                                                <div className="pb-4">{item.icon}</div>
                                                                <div className="pb-1 font-semibold">{item.title}</div>
                                                                <div className="text-gray-500">{item.text}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-10">
                                            <div className="grid grid-cols-12 gap-6">
                                                <div className="col-span-6">
                                                    <VehicleTripDetails text="Pickup" type="pickup" />
                                                </div>
                                                <div className="col-span-6">
                                                    <VehicleTripDetails text="Return" type="return" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-10">
                                            <div className="grid grid-cols-12 gap-6">
                                                <div className="col-span-6">
                                                    <VehicleButton vehicle={vehicle} />
                                                </div>
                                                <div className="col-span-6">
                                                    <Link href="/search-results" className="btn btn-gray w-full" scroll={true}>Pick different vehicle</Link>
                                                </div>
                                            </div>
                                        </div>
                                        {vehicle.description && (
                                            <div className="pt-10">
                                                <h4>Description</h4>
                                                <div className="pt-4 text-gray-600">
                                                    {vehicle.description}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                    {otherVehicles.length != 0 && (
                        <section>
                            <div className="container py-12">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2>Other similar cars</h2>
                                    </div>
                                    <div>
                                        <Link href="/search-results" className="flex items-center gap-2 font-semibold cursor-pointer hover:underline" scroll={false}>
                                            <span>View All</span>
                                            <svg className="h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#000000" d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" /></svg>
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                        {otherVehicles.map((otherVehicle) => (
                                            <VehicleCard key={otherVehicle.id} vehicle={otherVehicle} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

