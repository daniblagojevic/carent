import Checkout from "@/components/checkout";
import { stripe } from "@/lib/stripe";

export default async function CheckoutPage() {



    // Create PaymentIntent as soon as the page loads
    const { client_secret: clientSecret } = await stripe.paymentIntents.create({
        amount: Math.round(113 * 100),
        currency: 'usd',
    })

    if (!clientSecret) {
        throw new Error("Failed to create PaymentIntent client secret");
    }

    return (
        <>
            <Checkout clientSecret={clientSecret} />
        </>
    );
}