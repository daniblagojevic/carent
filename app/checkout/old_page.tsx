"use client";

import Loading from "@/components/loading";
import ReviewOrder from "@/components/reviewOrder";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useState, useEffect } from "react";

import PaymentMethod from "@/components/paymentMethod";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {

    const total = useCartStore((state) => state.getTotal());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    // stripe 
    const amount = 49.99;


    return (
        <>
            {!loading ? (
                <section>
                    <div className="container py-12">
                        <div className="grid grid-cols-12 gap-12">
                            <div className="col-span-8">
                                <div className="pb-6">
                                    <a className="inline-flex items-center text-sm gap-1 hover:underline text-majorelle-600" href="/extras">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
                                        Back to Extras
                                    </a>
                                </div>

                                <h1 className="pb-12">Checkout</h1>

                                <div className="pb-16">
                                    <h4 className="pb-6">Who will drive?</h4>
                                    <div className="grid grid-cols-12 gap-x-12 gap-y-6">
                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium mb-2">First name *</label>
                                            <input type="text" autoComplete="given-name" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600" placeholder="First name" />
                                        </div>
                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium mb-2">Last name *</label>
                                            <input type="text" autoComplete="family-name" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600" placeholder="Last name" />
                                        </div>
                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium mb-2">Email *</label>
                                            <input type="email" autoComplete="email" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600" placeholder="Email" />
                                        </div>
                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium mb-2">Phone *</label>
                                            <input type="text" autoComplete="tel" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600" placeholder="Phone" />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="block text-sm font-medium mb-2">Adress *</label>
                                            <input type="text" autoComplete="address-line1" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600" placeholder="Adress" />
                                        </div>
                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium mb-2">Zip *</label>
                                            <input type="text" autoComplete="postal-code" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600" placeholder="Zip" />
                                        </div>
                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium mb-2">City *</label>
                                            <input type="text" autoComplete="address-level2" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600" placeholder="City" />
                                        </div>
                                        <div className="col-span-12">
                                            <label className="block text-sm font-medium mb-2">Country *</label>
                                            <select data-hs-select='{
                                            "placeholder": "Select option...",
                                            "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                                            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-majorelle-600",
                                            "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
                                            "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50",
                                            "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-majorelle-600 \" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                                            "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                                            }' className="hidden"
                                            >
                                                <option value="">USA</option>
                                                <option>Germany</option>
                                                <option>United Kingdom</option>
                                                <option>Slovenia</option>
                                            </select>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="flex items-center">
                                                <input type="checkbox" className="shrink-0 border-gray-200 rounded-sm text-majorelle-600 focus:ring-majorelle-500 checked:border-majorelle-500 disabled:opacity-50 disabled:pointer-events-none" id="hs-age-checkbox" defaultChecked />
                                                <label htmlFor="hs-age-checkbox" className="ms-3">I am 23 years of age or older</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-16">
                                    <h4 className="pb-6">How would you like to pay?</h4>
                                    <div>
                                        <Elements
                                            stripe={stripePromise}
                                            options={{
                                                mode: "payment",
                                                amount: Math.round(amount * 100),
                                                currency: "usd",
                                                appearance: {
                                                    theme: 'stripe',
                                                    variables: {
                                                        colorPrimary: '#5937e0',
                                                        colorBackground: '#ffffff',
                                                        //colorText: '#000000',
                                                        //colorDanger: '#df1b41',
                                                        fontFamily: 'Poppins, sans-serif',
                                                        //spacingUnit: '2px',
                                                        borderRadius: '.75rem',
                                                    },
                                                    rules: {
                                                        '.AccordionItem, .Input': {
                                                            //border: '1px',
                                                            //borderColor: '#000000',
                                                        },
                                                    },
                                                },
                                            }}
                                        >
                                            <PaymentMethod amount={amount} />
                                        </Elements>
                                    </div>
                                </div>
                                <div className="pb-16">
                                    <h4 className="pb-6">What's your flight number?</h4>

                                </div>
                                <div className="">
                                    <div className="pb-6">
                                        <div className="flex items-center justify-between gap-6">
                                            <div>
                                                <h4>Total</h4>
                                            </div>
                                            <div className="shrink-0">
                                                <div className="text-majorelle-600 text-base md:text-lg lg:text-2xl font-semibold">${total}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-600 pb-6">
                                        <p>Refundable deposit: An additional € 300 security deposit will be blocked on your card at the pickup counter and released within a few days of the vehicle’s return.</p>
                                        <p>I have read and accept the <Link href="" className="underline">Rental Information</Link>, the <Link href="" className="underline">Terms and Conditions</Link>, and the <Link href="" className="underline">Privacy Policy</Link> and I acknowledge that I am booking a prepaid rate, where the total reservation price is immediately charged to the payment method I provided.</p>
                                        <p>See Rental Information for more details on accepted payment methods.</p>
                                        <p>After completing your reservation, we may send you information about our own similar services by email and text message. You can object to this at any time free of charge by sending an email to sixtcard@sixt.com</p>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary max-w-md w-full">Pay and Book</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <ReviewOrder />
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
}