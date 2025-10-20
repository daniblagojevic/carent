"use client";

import ReviewOrder from "@/components/reviewOrder";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";

const extras = [
    {
        id: 4,
        name: "GPS",
        pricePerDay: 5,
        enable_quantity: false,
        icon: "",
    },
    {
        id: 5,
        name: "Child Seat",
        pricePerDay: 10,
        enable_quantity: true,
        quantity: {
            max: 4,
            min: 1,
        },
        icon: "",
    },
    {
        id: 6,
        name: "Additional Driver",
        pricePerDay: 15,
        enable_quantity: true,
        quantity: {
            max: 2,
            min: 1,
        },
        icon: "",
    },
];

const deductibles = [
    {
        id: 1,
        name: "Maximum deductible",
        deductible: "Deductible: up to $1,180.48",
        text: "€1,000.00 (approx. $1,180.48) financial responsibility",
        pricePerDay: 0,
    },
    {
        id: 2,
        name: "Loss Damage Waiver with reduced deductible",
        deductible: "Deductible: up to $354.14",
        text: "€300.00 (approx. $354.14) financial responsibility",
        pricePerDay: 16.41,
    },
    {
        id: 3,
        name: "Loss Damage Waiver (including theft protection) with minimum deductible",
        deductible: "",
        text: "€0.00 financial responsibility",
        pricePerDay: 26.63,
    }
];

export default function Extras() {

    const addCartItem = useCartStore((state) => state.addCartItem);
    const removeCartItem = useCartStore((state) => state.removeCartItem);
    const updateCartItemQuantity = useCartStore((state) => state.updateCartItemQuantity);
    const cartItems = useCartStore((state) => state.cartItems ?? []); // this is needed because .find needs an array

    const [selectedDeductable, setSelectedDeductable] = useState<number | null>(null);
    const [selectedExtras, setSelectedExtras] = useState<number[]>([]);

    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});


    useEffect(() => {

        // deductible

        const deductibleInCart = cartItems.find((item) =>
            deductibles.some((d) => d.id === item.id)
        );
        if (deductibleInCart) {
            setSelectedDeductable(deductibleInCart.id);
        } else {
            // Default to the first deductible
            setSelectedDeductable(deductibles[0]?.id ?? null);
        }

        // extras

        const ids = cartItems.map(item => item.id);
        setSelectedExtras(ids);

        // quantities

        const initialQuantities: { [key: number]: number } = {};
        cartItems.forEach((item) => {
            initialQuantities[item.id] = item.quantity;
        });
        setQuantities(initialQuantities);


    }, [cartItems]);


    const handleDeductible = (item: typeof deductibles[0]) => {
        // Always remove the previously selected deductible
        if (selectedDeductable !== null && selectedDeductable !== item.id) {
            removeCartItem(selectedDeductable);
        }

        // Set the new selection
        setSelectedDeductable(item.id);

        // Add new deductible
        if (Number(item.pricePerDay) > 0) {
            addCartItem(
                { id: item.id, name: item.name, price: Number(item.pricePerDay) },
                1
            );
        }
    };


    const handleExtra = (item: typeof extras[0], e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedExtras((prev) => [...prev, item.id]);
            addCartItem(
                { id: item.id, name: item.name, price: Number(item.pricePerDay) },
                quantities[item.id] || 1
            );
        } else {
            setSelectedExtras((prev) => prev.filter((id) => id !== item.id));
            removeCartItem(item.id);
        }
    };

    // quantity

    const updateQuantity = (id: number, change: number) => {
        setQuantities((prev) => {
            const newQty = Math.max((prev[id] || 1) + change, 1); // no negative values

            // update Zustand store
            // updateCartItemQuantity(id, newQty);

            return { ...prev, [id]: newQty };
        });
    }


    useEffect(() => {
        //console.log(quantities);
    }, [quantities]);


    return (
        <>
            <section>
                <div className="container py-12">
                    <div className="grid grid-cols-12 gap-12">
                        <div className="col-span-8">
                            <div className="pb-12">
                                <h4 className="mb-4">Loss Damage Waiver</h4>
                                <p>Enjoy the peace of mind of knowing you're protected from high costs in case your vehicle is stolen or damaged. Instead of paying up to the full vehicle value, you'd only need to cover the deductible amount specified.</p>
                            </div>
                            <div className="pb-12">
                                <div className="grid grid-cols-12 gap-6">
                                    {deductibles.map((item, index) => (
                                        <div className="col-span-4" key={item.id}>
                                            <label className="cursor-pointer block h-full">
                                                <div className={`border-2 ${selectedDeductable === item.id ? "border-majorelle-600" : "border-gray-200"} rounded-xl overflow-hidden h-full flex flex-col`}>
                                                    <div className="bg-lotion p-4 h-46 flex flex-col justify-between shrink-0">
                                                        <div className="flex items-top justify-between gap-4">
                                                            <div>
                                                                <h5 className="font-semibold">{item.name}</h5>
                                                            </div>
                                                            <div>
                                                                <input
                                                                    type="radio"
                                                                    name="deductible"
                                                                    checked={selectedDeductable === item.id}
                                                                    onChange={() => handleDeductible(item)}
                                                                    className="shrink-0 mt-0.5 border-gray-200 radio-xl rounded-full text-majorelle-600 checked:border-majorelle-600 focus:ring-majorelle-600"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="pt-4">
                                                            {item.deductible ? (
                                                                <p className="text-sm">{item.deductible}</p>
                                                            ) : (
                                                                <p className="text-sm text-green-600">No deductible</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="p-4 h-full flex flex-col justify-between">
                                                        <div className="pb-6">
                                                            <p className="text-sm">{item.text}</p>
                                                        </div>
                                                        <div>
                                                            {item.pricePerDay ? (
                                                                <div className="text-sm">
                                                                    <span className="text-xl font-semibold">${item.pricePerDay}</span> / day
                                                                </div>
                                                            ) : (
                                                                <div className="text-xl font-semibold">Included</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="pb-6">
                                <h4 className="pb-6">Which add-ons do you need?</h4>
                                <div className="bg-majorelle-100 border border-majorelle-600 text-sm text-majorelle-600 rounded-lg py-4 px-6 flex gap-3" role="alert" aria-labelledby="hs-soft-color-info-label">
                                    <svg className="shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                                    <div>Drivers must have held their driver's license for at least 2 year(s) for this vehicle</div>
                                </div>
                            </div>
                            <div className="">
                                {extras.map((item) => (
                                    <div key={item.id} className="pb-4">
                                        <label className={`border-2 ${selectedExtras.includes(item.id) ? "border-majorelle-600" : "border-gray-200"} rounded-xl overflow-hidden cursor-pointer block py-4 px-6`} htmlFor={`switch-${item.id}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="w-full">
                                                    <div className="font-semibold">{item.name}</div>
                                                    <div className="font-semibold">${(item.pricePerDay).toFixed(2)} <span className="text-sm"> / day</span></div>
                                                </div>
                                                <div className="w-fit leading-none flex gap-4 items-center">
                                                    {selectedExtras.includes(item.id) && item.enable_quantity && (
                                                        <div>
                                                            <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg">
                                                                <div className="flex items-center gap-x-1.5">
                                                                    <button
                                                                        type="button"
                                                                        className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                                                        onClick={() => updateQuantity(item.id, -1)}
                                                                    >
                                                                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path></svg>
                                                                    </button>
                                                                    <input
                                                                        className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                                        type="number"
                                                                        value={quantities[item.id] || 1}
                                                                        readOnly
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                                                        onClick={() => updateQuantity(item.id, 1)}
                                                                    >
                                                                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="relative inline-block w-11 h-6 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                id={`switch-${item.id}`}
                                                                className="peer sr-only"
                                                                checked={selectedExtras.includes(item.id)}
                                                                onChange={(e) => handleExtra(item, e)}
                                                            />
                                                            <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-majorelle-600 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                                                            <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-4">
                            <ReviewOrder />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}