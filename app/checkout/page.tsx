"use client";

import Checkout from "@/components/checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
    const amount = 20.00;
    return (
        <>
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
                <Checkout />
            </Elements>
        </>
    );
}