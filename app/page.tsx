import RentalForm from "@/components/rentalForm";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <section>
                <div className="pb-2 md:pb-10">
                    <div className="container">
                        <div className="p-16 bg-gradient-to-r from-majorelle-900 to-majorelle-600 rounded-3xl text-white">
                            <div className="grid grid-cols-12 gap-12 justify-between items-center">
                                <div className="col-span-6">
                                    <h1 className="pb-12">Experiance the road like never before</h1>
                                    <div className="pb-12">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel gravida ante. Vivamus eu gravida nisl, et bibendum sem. Maecenas vestibulum tortor id mi ornare, non posuere nisi tempus.</p>
                                    </div>
                                    <div>
                                        <Link href="/about" className="btn btn-secondary">View all cars</Link>
                                    </div>
                                </div>
                                <div className="col-span-5 col-start-8">
                                    <RentalForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="pb-2 md:pb-10">
                    <div className="container">
                        <div>fsdfsdfdsfdsf 234</div>
                    </div>
                </div>
            </section>
        </>
    );
}
