import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db"; // your drizzle instance
import { eq, or, and, isNull, desc, asc } from "drizzle-orm";
import { orders, orderItems } from "@/db/schema";
import { getRentalDays } from "@/lib/functions";

export default async function AccountPage() {
    const session = await auth();

    if (!session?.user) {
        redirect('/api/auth/signin?callbackUrl=/account');
    }

    const userId = session.user.id ?? null;
    const userEmail = session.user.email ?? null;
    let userOrders = null;

    if (userId && userEmail) {
        userOrders = await db
            .select()
            .from(orders)
            .where(
                or(
                    eq(orders.userId, userId), // logged in orders
                    and(isNull(orders.userId), eq(orders.email, userEmail)) // guest orders
                )
            )
            .orderBy(desc(orders.createdAt));
    }




    return (
        <>
            <section>
                <div className="py-20 container">
                    <div className="grid grid-cols-12 gap-12">
                        <div className="col-span-4">
                            <div className="">
                                <div className="flex flex-col">
                                    <div className="inline-flex items-center gap-x-3.5 py-3 px-4 text-sm font-medium bg-lotion rounded-xl">
                                        <div className="flex items-center gap-6">
                                            <div className="flex-shrink-0">
                                                {session.user.image && (
                                                    <img src={session.user.image} className="w-20 h-20 rounded-full" />
                                                )}
                                            </div>
                                            <div>
                                                <h6 className="font-bold">{session.user.name}</h6>
                                                <p className="text-sm text-gray-500">{session.user.email}</p>
                                                <form
                                                    action={async () => {
                                                        "use server";
                                                        await signOut();
                                                    }}
                                                >
                                                    <button
                                                        type="submit"
                                                        className="text-red-600 hover:underline cursor-pointer"
                                                    >
                                                        Sign out
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-8">
                            <div>
                                {userOrders ? (
                                    <ul>
                                        {await Promise.all(
                                            userOrders.map(async (order) => {
                                                const _orderItems = await db.select().from(orderItems).where(eq(orderItems.orderId, Number(order.id)));
                                                return (
                                                    <li key={order.id} className="bg-lotion p-6 mb-6 rounded-xl">
                                                        <div className="border-b border-gray-300 pb-4">
                                                            <div className="grid grid-cols-12 gap-6">
                                                                <div className="col-span-3">
                                                                    <p className="font-semibold pb-1">Order number</p>
                                                                    <p className="text-sm text-gray-500">
                                                                        #{order.id}
                                                                    </p>
                                                                </div>
                                                                <div className="col-span-3">
                                                                    <p className="font-semibold pb-1">Date placed</p>
                                                                    <p className="text-sm text-gray-500">
                                                                        {order.createdAt.toLocaleDateString()}
                                                                    </p>
                                                                </div>
                                                                <div className="col-span-3">
                                                                    <p className="font-semibold pb-1">Vehicle</p>
                                                                    <p className="text-sm text-gray-500">
                                                                        {order.vehicleName}
                                                                    </p>
                                                                </div>
                                                                <div className="col-span-3">
                                                                    <p className="font-semibold pb-1">Total</p>
                                                                    <p className="text-sm text-gray-500">
                                                                        ${order.total}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pt-6 border-b border-gray-300 pb-4">
                                                            <div className="grid grid-cols-12">
                                                                <div className="col-span-4">
                                                                    <img src={`vehicles/${order.vehicleImage}`} className="aspect-video w-full object-contain" />
                                                                </div>
                                                                <div className="col-span-8">
                                                                    <ul>
                                                                        <li className="flex justify-between text-sm py-1">
                                                                            <div className="text-sm">{getRentalDays(String(order.pickupDate), String(order.returnDate))} rental days x ${order.vehiclePrice}</div>
                                                                            <div className="shrink-0">${Number(order.vehiclePrice) * getRentalDays(String(order.pickupDate), String(order.returnDate))}</div>
                                                                        </li>
                                                                        {_orderItems.map((item) => (
                                                                            <li
                                                                                key={item.id}
                                                                                className="flex justify-between text-sm py-1"
                                                                            >
                                                                                <div>
                                                                                    {item.quantity} × {item.name}
                                                                                </div>
                                                                                <div>${item.total}</div>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pt-6 text-sm">
                                                            <div className="grid grid-cols-12 gap-6">
                                                                <div className="col-span-4">
                                                                    <div className="pb-1 font-semibold">Pickup</div>
                                                                    <div className="">
                                                                        <div className="text-gray-500">Date: <span className="text-majorelle-600 font-bold">{order.pickupDate.toLocaleDateString()} at {order.pickupTime}</span></div>
                                                                    </div>
                                                                    <div className="">
                                                                        <div className="text-gray-500">Location: <span className="text-majorelle-600 font-bold">{order.pickupLocation}</span></div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4">
                                                                    <div className="pb-1 font-semibold">Return</div>
                                                                    <div className="">
                                                                        <div className="text-gray-500">Date: <span className="text-majorelle-600 font-bold">{order.returnDate.toLocaleDateString()} at {order.returnTime}</span></div>
                                                                    </div>
                                                                    <div className="">
                                                                        <div className="text-gray-500">Location: <span className="text-majorelle-600 font-bold">{order.returnLocation}</span></div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4">
                                                                    <div className="">
                                                                        <div className="font-semibold">{order.firstName} {order.lastName}</div>
                                                                        <div className="">{order.email}</div>
                                                                        <div className="">{order.phone}</div>
                                                                        <div className="">{order.address1}, {order.postcode}, {order.city}, {order.country}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        )}
                                    </ul>
                                ) : (
                                    <div className="bg-red-100 border border-red-200 text-sm text-red-800 rounded-xl p-4" role="alert" aria-labelledby="hs-soft-color-warning-label">
                                        No orders found
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}