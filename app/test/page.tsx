"use client";

import { useState } from "react";

export default function NewOrderForm() {
    const [formData, setFormData] = useState({
        vehicleId: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        pickupLocation: "",
        returnLocation: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address1: "",
        city: "",
        postcode: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const dateString = formData.startDate;
        const date = new Date(dateString);
        const timestamp = date.getTime();
        console.log(timestamp);

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                setMessage("Order created successfully! "+data.order.id);
                /*
                setFormData({
                    vehicleId: "",
                    startDate: "",
                    startTime: "",
                    endDate: "",
                    endTime: "",
                    pickupLocation: "",
                    returnLocation: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    address1: "",
                    address2: "",
                    city: "",
                    postcode: "",
                });
                */
            } else {
                setMessage("Error: " + data.error);
            }
        } catch (err) {
            setMessage("Error: " + (err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
            <h2 className="text-xl font-bold">Create New Order</h2>

            <input
                type="number"
                name="vehicleId"
                placeholder="Vehicle ID"
                value={formData.vehicleId}
                onChange={handleChange}
                required
            />

            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />

            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />

            <input type="text" name="pickupLocation" placeholder="Pickup Location" value={formData.pickupLocation} onChange={handleChange} required />
            <input type="text" name="returnLocation" placeholder="Return Location" value={formData.returnLocation} onChange={handleChange} required />

            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            <input type="text" name="address1" placeholder="Address 1" value={formData.address1} onChange={handleChange} required />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            <input type="text" name="postcode" placeholder="Postcode" value={formData.postcode} onChange={handleChange} required />

            <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Create Order"}
            </button>

            {message && <p>{message}</p>}
        </form>
    );
}
