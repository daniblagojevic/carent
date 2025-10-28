"use client";

import Loading from "@/components/loading";
import ReviewOrder from "./reviewOrder";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

import { useState, useEffect, use } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
    Elements
} from '@stripe/react-stripe-js'
import { StripePaymentElementOptions } from "@stripe/stripe-js";

export default function Checkout() {
    const total = useCartStore((state) => state.getTotal());
    const clearCart = useCartStore((state) => state.clearCart);

    // billing details

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [postcode, setPostcode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    // loading 

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    // stripe

    const stripe = useStripe();
    const elements = useElements();
    const [loadingStripe, setLoadingStripe] = useState(false);
    const [message, setMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [paymentIntent, setPaymentIntent] = useState("");

    // create payment intent

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: Math.round(total * 100) }),
        }).then((res) => res.json()).then((data) => {
            setClientSecret(data.clientSecret)
            setPaymentIntent(data.paymentIntentId)
        });
    }, [total]);


    // billing details object for stripe

    const billingDetails = {
        name: `${firstName} ${lastName}`,
        email: email,
        phone: phone,
        address: {
            line1: address,
            postal_code: postcode,
            city: city,
            state: city,
            country: country,
        },
    };


    // handle submit

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setLoadingStripe(true);

        if (!stripe || !elements) {
            return;
        }

        // create order

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    vehicleId: useCartStore.getState().vehicle!.id,
                    vehicleName: useCartStore.getState().vehicle!.name,
                    vehicleImage: useCartStore.getState().vehicle!.image,
                    vehiclePrice: useCartStore.getState().vehicle!.price,
                    pickupDate: useCartStore.getState().pickupDate,
                    pickupTime: useCartStore.getState().pickupTime,
                    returnDate: useCartStore.getState().returnDate,
                    returnTime: useCartStore.getState().returnTime,
                    pickupLocation: useCartStore.getState().pickupLocation,
                    returnLocation: useCartStore.getState().returnLocation,
                    total: total,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    address1: address,
                    city: city,
                    postcode: postcode,
                    country: country,
                    cartItems: useCartStore.getState().cartItems,
                    stripeId: paymentIntent, // to be updated after payment is confirmed
                }),
            });
            const data = await res.json();

            if (data.success) {

                // stripe

                const { error: submitError } = await elements.submit();

                if (submitError) {
                    setMessage(submitError.message);
                    setLoadingStripe(false);
                    return;
                }

                const { error, paymentIntent } = await stripe.confirmPayment({
                    elements,
                    clientSecret,
                    confirmParams: {
                        return_url: `http://localhost:3000/success?total=${total}`,
                        payment_method_data: {
                            billing_details: billingDetails
                        }
                    },
                    redirect: "if_required",
                });

                if (error) {
                    // This point is only reached if there's an immediate error when
                    // confirming the payment. Show the error to your customer (for example, payment details incomplete)
                    setMessage(error.message);
                } else if (paymentIntent && paymentIntent.status === "succeeded") {
                    // The payment UI automatically closes with a success animation.
                    // Your customer is redirected to your `return_url`.
                    //setMessage("Payment succeeded!");
                    clearCart();
                    window.location.href = `/success?order-id=${data.order.id}&payment_intent=${paymentIntent.id}`;
                } else {
                    setMessage("Payment failed");
                }
            } else {
                setMessage("Error: " + data.error);
            }
        } catch (error: any) {
            setMessage(error.message);
        }

        setLoadingStripe(false);
    };

    const paymentElementOptions: StripePaymentElementOptions = {
        layout: "accordion",
        fields: {
            billingDetails: {
                name: "never",   // options: 'always' | 'auto' | 'never'
                email: "never",
                phone: "never",
                address: "never",
            },
        },
        defaultValues: {
            billingDetails: {
                email: `${email}`,
                phone: `${phone}`,
                name: `${firstName} ${lastName}`,
                address: {
                    line1: `${address}`,
                    postal_code: `${postcode}`,
                    city: `${city}`,
                    country: `${country}`,
                },
            },
        },
    };

    return (
        <>
            {!loading ? (
                <section>
                    <form onSubmit={handleSubmit}>
                        <div className="container py-12">
                            <div className="grid grid-cols-12 gap-12">
                                <div className="col-span-8">
                                    <div className="pb-6">
                                        <Link className="inline-flex items-center text-sm gap-1 hover:underline text-majorelle-600" href="/extras">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
                                            Back to Extras
                                        </Link>
                                    </div>

                                    <h1 className="pb-12">Checkout</h1>

                                    <div className="pb-16">
                                        <h4 className="pb-6">Who will drive?</h4>
                                        <div className="grid grid-cols-12 gap-x-12 gap-y-6">
                                            <div className="col-span-6">
                                                <label className="block text-sm font-medium mb-2">First name *</label>
                                                <input
                                                    type="text"
                                                    autoComplete="given-name"
                                                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600"
                                                    placeholder="First name"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="block text-sm font-medium mb-2">Last name *</label>
                                                <input
                                                    type="text"
                                                    autoComplete="family-name"
                                                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600"
                                                    placeholder="Last name"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="block text-sm font-medium mb-2">Email *</label>
                                                <input
                                                    type="email"
                                                    autoComplete="email"
                                                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600"
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="block text-sm font-medium mb-2">Phone *</label>
                                                <input
                                                    type="text"
                                                    autoComplete="tel"
                                                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600"
                                                    placeholder="Phone"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-12">
                                                <label className="block text-sm font-medium mb-2">Adress *</label>
                                                <input
                                                    type="text"
                                                    autoComplete="address-line1"
                                                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600"
                                                    placeholder="Adress"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="block text-sm font-medium mb-2">Postcode *</label>
                                                <input
                                                    type="text"
                                                    autoComplete="postal-code"
                                                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600"
                                                    placeholder="Postcode"
                                                    value={postcode}
                                                    onChange={(e) => setPostcode(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="block text-sm font-medium mb-2">City *</label>
                                                <input
                                                    type="text"
                                                    autoComplete="address-level2"
                                                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-majorelle-600 focus:ring-majorelle-600"
                                                    placeholder="City"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    required
                                                />
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
                                                    }'
                                                    className="hidden"
                                                    value={country}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                    required
                                                >
                                                    <option value="US">USA</option>
                                                    <option value="DE">Germany</option>
                                                    <option value="GB">United Kingdom</option>
                                                    <option value="SI">Slovenia</option>
                                                </select>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="shrink-0 border-gray-200 rounded-sm text-majorelle-600 focus:ring-majorelle-500 checked:border-majorelle-500 disabled:opacity-50 disabled:pointer-events-none"
                                                        id="hs-age-checkbox"
                                                        defaultChecked
                                                        required
                                                    />
                                                    <label htmlFor="hs-age-checkbox" className="ms-3">I am 23 years of age or older</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-16">
                                        <h4 className="pb-6">How would you like to pay?</h4>
                                        <div>
                                            {!clientSecret || !stripe || !elements ? (
                                                <div>
                                                    <Loading />
                                                </div>
                                            ) : (
                                                <div>
                                                    {clientSecret && <PaymentElement options={paymentElementOptions} />}
                                                    {message && <div>{message}</div>}
                                                </div>
                                            )}
                                        </div>
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
                                            <button disabled={!stripe || loadingStripe} className="btn btn-primary max-w-md w-full">Pay and Book - ${total}</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4">
                                    <ReviewOrder />
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
}