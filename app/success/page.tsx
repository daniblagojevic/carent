import Link from "next/link";
import { db } from "@/db"; // your Drizzle database instance
import { orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getRentalDays } from "@/lib/functions";


interface SuccessPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
    const params = await searchParams;
    const orderIdParam = params["order-id"];

    let orderId: string | null = null;

    if (Array.isArray(orderIdParam)) {
        orderId = orderIdParam[0];
    } else if (typeof orderIdParam === "string") {
        orderId = orderIdParam;
    }

    if (!orderId) return (
        <>
            <section>
                <div className="py-20 container">
                    <div className="w-full max-w-4xl mx-auto">
                        <div className="mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4" role="alert" aria-labelledby="hs-soft-color-danger-label">
                            Invalid order ID.
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

    // Fetch from API
    const res = await fetch(`http://localhost:3000/api/orders/${orderId}`);
    if (!res.ok) return <div>Failed to fetch order</div>;

    // get order via API
    const order = await res.json();

    // get order items VIA DB
    const _orderItems = await db.select().from(orderItems).where(eq(orderItems.orderId, Number(orderId)));

    console.log("Order Items:", orderItems);

    return (
        <>
            <section>
                <div className="py-20 container">
                    <div className="w-full max-w-4xl mx-auto">
                        <div className="flex gap-12 pb-12 items-center">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-20" viewBox="0 0 640 640"><path fill="#5937e0" d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z" /></svg>
                            </div>
                            <div>
                                <div>
                                    <h2 className="font-bold">{order.firstName}, Thank You for Your Order!</h2>
                                </div>
                            </div>
                        </div>
                        <p className="text-center pb-12">Your order (#{order.id}) is in good hands! We'll notify you once it's en route. For now, here's a snapshot of your purchase</p>
                        <div className="pb-6 ">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-6">
                                    <div className="bg-lotion rounded-xl p-8 mb-6">
                                        <div className="border-b border-gray-300 pb-3">
                                            <h4 className="pb-4">Total</h4>
                                            <ul className="space-y-2">
                                                <li className="flex justify-between gap-3">
                                                    <div className="text-sm">{getRentalDays(String(order.pickupDate), String(order.returnDate))} rental days x ${order.vehiclePrice}</div>
                                                    <div className="shrink-0">${order.vehiclePrice * getRentalDays(String(order.pickupDate), String(order.returnDate))}</div>
                                                </li>
                                                {_orderItems.map(item => (
                                                    <li key={item.id} className="flex justify-between gap-3">
                                                        <div className="text-sm">{item.quantity} x {item.name}</div>
                                                        <div className="shrink-0">${item.total}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="pt-3">
                                            <div className="flex justify-between gap-3">
                                                <div>
                                                    <h5 className="text-lg font-semibold pb-2">Total</h5>
                                                </div>
                                                <div>${order.total}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-lotion rounded-xl p-8 mb-6">
                                        <h4 className="pb-4">Pickup</h4>
                                        <div className="">
                                            <div className="text-gray-500 pb-2">
                                                Date:
                                                <span className="text-majorelle-600 font-bold ms-2">
                                                    {new Date(order.pickupDate).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}{" "}
                                                    at {order.pickupTime}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="text-gray-500">Location:<span className="text-majorelle-600 font-bold ms-2">{order.pickupLocation}</span></div>
                                        </div>
                                    </div>
                                    <div className="bg-lotion rounded-xl p-8">
                                        <h4 className="pb-4">Return</h4>
                                        <div className="">
                                            <div className="text-gray-500 pb-2">
                                                Date:
                                                <span className="text-majorelle-600 font-bold ms-2">
                                                    {new Date(order.returnDate).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}{" "}
                                                    at {order.returnTime}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="text-gray-500">Location:<span className="text-majorelle-600 font-bold ms-2">{order.returnLocation}</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="bg-lotion rounded-xl p-8 mb-6">
                                        <h4 className="pb-4">Vehicle</h4>
                                        <div className="">
                                            <div className="">
                                                <h5 className="text-lg font-semibold pb-2">{order.vehicleName}</h5>
                                            </div>
                                            <div className="">
                                                <img
                                                    src={`/vehicles/${order.vehicleImage}`}
                                                    alt={order.vehicleName}
                                                    className="w-full object-cover rounded-xl"
                                                />
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <div className="flex flex-wrap gap-5">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-lotion rounded-xl p-8 mb-6">
                                        <h4 className="pb-4">Billing</h4>
                                        <div className="pb-2 font-semibold">{order.firstName} {order.lastName}</div>
                                        <div className="pb-2">{order.email}</div>
                                        <div className="pb-2">{order.phone}</div>
                                        <div className="pb-2">{order.address1}</div>
                                        <div className="pb-2">{order.postcode} {order.city}</div>
                                        <div className="pb-2">{order.country}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link href="/" className="btn btn-primary">Back to homepage</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}