"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function RentalForm() {
    const router = useRouter();

    const {
        vehicle,
        cartItems,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        pickupLocation,
        returnLocation,
        setDates,
        setLocations,
    } = useCartStore();

    const locations = [
        "New York",
        "Los Angeles",
        "Chicago",
        "Miami",
        "San Francisco",
        "Milwaukee",
    ];

    // Local state for form inputs
    const [_pickupLocation, setPickupLocation] = useState("");
    const [_returnLocation, setReturnLocation] = useState("");
    const [_pickupDate, setPickupDate] = useState("");
    const [_pickupTime, setPickupTime] = useState("");
    const [_returnDate, setReturnDate] = useState("");
    const [_returnTime, setReturnTime] = useState("");

    // Sync local state with Zustand store after hydration
    useEffect(() => {
        if (pickupLocation) setPickupLocation(pickupLocation);
        if (returnLocation) setReturnLocation(returnLocation);
        if (pickupDate) setPickupDate(pickupDate);
        if (pickupTime) setPickupTime(pickupTime);
        if (returnDate) setReturnDate(returnDate);
        if (returnTime) setReturnTime(returnTime);
    }, [
        pickupLocation,
        returnLocation,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Save to cart store
        setDates(_pickupDate, _pickupTime, _returnDate, _returnTime);
        setLocations(_pickupLocation, _returnLocation);

        console.log("Saved to cart store:", {
            _pickupLocation,
            _returnLocation,
            _pickupDate,
            _pickupTime,
            _returnDate,
            _returnTime,
        });

        // Optional: redirect to search results or checkout page
        router.push("/search-results");
    };

    return (
        <div className="bg-white p-12 rounded-3xl text-black">
            <div className="text-center pb-6">
                <h3>Book your car</h3>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-4">
                    {/* Pickup Location */}
                    <div className="col-span-12">
                        <label className="block mb-1 font-semibold">Pickup Location</label>
                        <select data-hs-select='{
                                "placeholder": "Select option...",
                                "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                                "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-majorelle-600",
                                "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
                                "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50",
                                "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-majorelle-600 \" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                                "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                            }'
                            className="hidden"
                            value={_pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            required
                        >
                            <option value="">Select a location</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Return Location */}
                    <div className="col-span-12">
                        <label className="block mb-1 font-semibold">Return Location</label>
                        <select data-hs-select='{
                                "placeholder": "Select option...",
                                "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                                "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-majorelle-600",
                                "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
                                "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50",
                                "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-majorelle-600 \" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                                "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                            }'
                            className="hidden"
                            value={_returnLocation}
                            onChange={(e) => setReturnLocation(e.target.value)}
                            required
                        >
                            <option value="">Select a location</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Pickup Date */}
                    <div className="col-span-6">
                        <label className="block mb-1 font-semibold">Pickup Date</label>
                        <input
                            type="date"
                            value={_pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600"
                            required
                        />

                        {/* Pickup Time 
                        <input 
                            className="hs-datepicker py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600 disabled:opacity-50 disabled:pointer-events-none" 
                            type="text"
                            value={_pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            readOnly
                            required
                            placeholder="Select day" 
                            data-hs-datepicker='{
                                "type": "default",
                                "dateMax": "2050-10-31",
                                "mode": "custom-select",
                                "templates": {
                                "arrowPrev": "<button data-vc-arrow=\"prev\" /><svg className=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"m15 18-6-6 6-6\"></path></svg></button>",
                                "arrowNext": "<button data-vc-arrow=\"next\"><svg className=\"shrink-0 size-4\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"m9 18 6-6-6-6\"></path></svg></button>"
                                }
                            }'
                        />
                        */}


                    </div>

                    {/* Pickup Time */}
                    <div className="col-span-6">
                        <label className="block mb-1 font-semibold">Pickup Time</label>
                        <input
                            type="time"
                            value={_pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600"
                            required
                        />
                    </div>

                    {/* Return Date */}
                    <div className="col-span-6">
                        <label className="block mb-1 font-semibold">Return Date</label>
                        <input
                            type="date"
                            value={_returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600"
                            required
                        />
                    </div>

                    {/* Return Time */}
                    <div className="col-span-6">
                        <label className="block mb-1 font-semibold">Return Time</label>
                        <input
                            type="time"
                            value={_returnTime}
                            onChange={(e) => setReturnTime(e.target.value)}
                            className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-12">
                        <button
                            type="submit"
                            className="btn btn-secondary w-full mt-4"
                        >
                            Book now
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
