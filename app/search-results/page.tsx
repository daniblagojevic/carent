"use client";

import VehicleList from "@/components/vehicleList";

export default function SearchResults() {
    return (
        <>
            <section>
                <div className="py-6 md:py-12">
                    <div className="container">
                        <div className="text-center pb-12">
                            <h1 className="h2">Select a vehicle group</h1>
                        </div>
                        <div>
                            <VehicleList />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
