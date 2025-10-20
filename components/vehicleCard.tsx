import Link from "next/link";
import { ReactElement } from "react";

type Vehicle = {
    id: number;
    name: string;
    doors: number;
    seats: number;
    luggage: number;
    price: number;
    image: string;
    description?: string | null;
    transmission: string;
    fuelType: string;
    bodyType: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {

    const items : { text: string; icon: ReactElement }[] = [
        { 
            text: vehicle.transmission, 
            icon: (<svg viewBox="0 0 24 24" className="h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M2 4C2 2.89543 2.89543 2 4 2C5.10457 2 6 2.89543 6 4C6 4.83934 5.48296 5.55793 4.75 5.85462V11.25H11.25V5.85462C10.517 5.55793 10 4.83934 10 4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4C14 4.83934 13.483 5.55793 12.75 5.85462V11.25H16C16.964 11.25 17.6116 11.2484 18.0946 11.1835C18.5561 11.1214 18.7536 11.0142 18.8839 10.8839C19.0142 10.7536 19.1214 10.5561 19.1835 10.0946C19.2484 9.61157 19.25 8.96401 19.25 8V5.85462C18.517 5.55793 18 4.83934 18 4C18 2.89543 18.8954 2 20 2C21.1046 2 22 2.89543 22 4C22 4.83934 21.483 5.55793 20.75 5.85462V8.05199C20.75 8.95048 20.7501 9.6997 20.6701 10.2945C20.5857 10.9223 20.4 11.4891 19.9445 11.9445C19.4891 12.4 18.9223 12.5857 18.2945 12.6701C17.6997 12.7501 16.9505 12.75 16.052 12.75L12.75 12.75L12.75 18.1454C13.483 18.4421 14 19.1607 14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20C10 19.1607 10.517 18.4421 11.25 18.1454V12.75H4.75V18.1454C5.48296 18.4421 6 19.1607 6 20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20C2 19.1607 2.51704 18.4421 3.25 18.1454V5.85462C2.51704 5.55793 2 4.83934 2 4Z" fill="#000000" /> <path fillRule="evenodd" clipRule="evenodd" d="M17.25 15C17.25 14.5858 17.5858 14.25 18 14.25H20.2857C21.6612 14.25 22.75 15.3839 22.75 16.75C22.75 17.8285 22.0713 18.7624 21.1086 19.1077L22.6396 21.6084C22.8559 21.9616 22.7449 22.4234 22.3916 22.6396C22.0384 22.8559 21.5766 22.7449 21.3604 22.3916L19.4369 19.25H18.75V22C18.75 22.4142 18.4142 22.75 18 22.75C17.5858 22.75 17.25 22.4142 17.25 22V15ZM18.75 17.75H20.2857C20.8038 17.75 21.25 17.3169 21.25 16.75C21.25 16.1831 20.8038 15.75 20.2857 15.75H18.75V17.75Z" fill="#000000" /> </g></svg>) 
        },
        { 
            text: vehicle.fuelType, 
            icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-5" viewBox="0 0 640 640"><path fill="#000000" d="M96 128C96 92.7 124.7 64 160 64L320 64C355.3 64 384 92.7 384 128L384 320L392 320C440.6 320 480 359.4 480 408L480 440C480 453.3 490.7 464 504 464C517.3 464 528 453.3 528 440L528 286C500.4 278.9 480 253.8 480 224L480 164.5L454.2 136.2C445.3 126.4 446 111.2 455.8 102.3C465.6 93.4 480.8 94.1 489.7 103.9L561.4 182.7C570.8 193 576 206.4 576 220.4L576 440C576 479.8 543.8 512 504 512C464.2 512 432 479.8 432 440L432 408C432 385.9 414.1 368 392 368L384 368L384 529.4C393.3 532.7 400 541.6 400 552C400 565.3 389.3 576 376 576L104 576C90.7 576 80 565.3 80 552C80 541.5 86.7 532.7 96 529.4L96 128zM160 144L160 240C160 248.8 167.2 256 176 256L304 256C312.8 256 320 248.8 320 240L320 144C320 135.2 312.8 128 304 128L176 128C167.2 128 160 135.2 160 144z" /></svg>) 
        },
        { 
            text: vehicle.doors.toString() + " doors", 
            icon: (<svg fill="#000000" viewBox="0 0 24 24" className="h-5" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path id="primary" d="M19,2H12.41A2,2,0,0,0,11,2.59L3.59,10A2,2,0,0,0,3,11.41V20a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V4A2,2,0,0,0,19,2Zm0,8H6.41l6-6H19Z" className="fill-current" /><path id="secondary" d="M18,14H15a1,1,0,0,1,0-2h3a1,1,0,0,1,0,2Z" className="fill-current" /></g></svg>) 
        },
        /*
        { 
            text: vehicle.seats.toString() + " seats", 
            icon: (<svg className="h-5" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g> <path className="st0" d="M399.151,0.039c-35.093-1.211-64.489,26.244-65.692,61.337c-1.219,35.093,26.245,64.507,61.33,65.718 c35.084,1.21,64.498-26.262,65.699-61.347C461.708,30.663,434.235,1.249,399.151,0.039z"></path> <path className="st0" d="M382.245,153.356c-24.019-9.49-51.188,2.279-60.661,26.324v-0.027l-50.761,126.788l-99.12-29.164 c-21.464-8.173-45.464,2.092-54.358,23.28L54.021,466.845c-6.961,16.56,0.828,35.646,17.414,42.608 c16.585,6.961,35.663-0.837,42.625-17.404l65.78-120.655l76.24,30.17c45.17,18.606,77.068,0,95.665-45.179l56.833-142.35 C418.059,190.007,406.29,162.846,382.245,153.356z"></path> </g> </g></svg>) 
        },
        */
    ];


    return (
        <>
            <div className="rounded-3xl  bg-lotion flex flex-col justify-between p-6">
                <div className="pb-6">
                    {vehicle.image && (
                        <img
                            src={`/vehicles/${vehicle.image}`}
                            alt={vehicle.name}
                            className="w-full h-48 object-cover rounded-xl"
                        />
                    )}
                </div>
                <div className="">
                    <div className="flex flex-col">
                        <div className="pb-6">
                            <div className="pb-4">
                                <div className="flex flex-wrap gap-4">
                                    <div className="w-full md:flex-1">
                                        <h4 className="">{vehicle.name}</h4>
                                        <div className="text-gray-500 text-sm">{vehicle.bodyType}</div>
                                    </div>
                                    <div className="w-full md:w-auto text-end">
                                        <div className="text-xl font-semibold text-majorelle-600">${vehicle.price}</div>
                                        <div className="text-gray-500 text-sm">per day</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-wrap gap-5">
                                    {items.map((item, index) => (
                                        <div key={index} className="w-auto">
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    {item.icon}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {item.text}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Link href={`/vehicles/${vehicle.id}`} className="btn btn-primary w-full" scroll={true}>View Details</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
