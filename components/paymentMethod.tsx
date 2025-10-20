"use client";

import { useState, useEffect } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
    Elements
} from '@stripe/react-stripe-js'
import Loading from "@/components/loading";
import { StripePaymentElementOptions } from "@stripe/stripe-js";


export default function PaymentMethod({ amount }: { amount: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loadingStripe, setLoadingStripe] = useState(false);

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: Math.round(amount * 100) }),
        }).then((res) => res.json()).then((data) => setClientSecret(data.clientSecret));
    }, [amount]);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingStripe(true);

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoadingStripe(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/success?amount=${amount}`,
                payment_method_data: {
                    billing_details: {
                        name: 'Peter Novak',
                        email: 'test@example.com',
                        phone: '+386 70 194 938',
                        address: {
                            country: 'SI',
                            postal_code: '1000',
                            state: 'Ljubljana',
                            city: 'Ljubljana',
                            line1: '1234 Test St',
                            line2: 'Apt 1',
                        },
                    }
                }
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error when
            // confirming the payment. Show the error to your customer (for example, payment details incomplete)
            setErrorMessage(error.message);
        } else {
            // The payment UI automatically closes with a success animation.
            // Your customer is redirected to your `return_url`.
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
                email: "test@example.com",
                phone: "+386 70 194 938",
                name: "PEter Novak",
                address: {
                    country: "SI",
                },
            },
        },
    };


    return (
        <>
            {!clientSecret || !stripe || !elements ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <div>
                    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
                        {clientSecret && <PaymentElement options={paymentElementOptions} />}

                        {errorMessage && <div>{errorMessage}</div>}

                        <button
                            disabled={!stripe || loadingStripe}
                            className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
                        >
                            {!loadingStripe ? `Pay $${amount}` : "Processing..."}
                        </button>
                    </form>
                </div>
            )}

        </>

    );

}