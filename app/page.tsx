import RentalForm from "@/components/rentalForm";
import Link from "next/link";

export default function Home() {

    const items1: { title: string, text: string, image: string }[] = [
        {
            title: "Availability",
            text: "Diam tincidunt tincidunt erat at semper fermentum. Id ultricies quis",
            image: "/location.svg",
        },
        {
            title: "Comfort",
            text: "Gravida auctor fermentum morbi vulputate ac egestas orcietium convallis",
            image: "/car.svg",
        },
        {
            title: "Savings",
            text: "Pretium convallis id diam sed commodo vestibulum lobortis volutpat",
            image: "/savings.svg",
        },
    ];

    return (
        <>
            <section>
                <div className="pb-2 md:pb-10">
                    <div className="container">
                        <div className="py-8 sm:py-16 px-4 sm:px-16 bg-gradient-to-r from-majorelle-900 to-majorelle-600 rounded-3xl text-white">
                            <div className="grid grid-cols-12 gap-6 md:gap-12 justify-between items-center">
                                <div className="col-span-12 lg:col-span-6">
                                    <h1 className="pb-12">Experiance the road like never before</h1>
                                    <div className="pb-12">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel gravida ante. Vivamus eu gravida nisl, et bibendum sem. Maecenas vestibulum tortor id mi ornare, non posuere nisi tempus.</p>
                                    </div>
                                    <div>
                                        <Link href="/" className="btn btn-secondary">View all cars</Link>
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-6 xl:col-span-5 xl:col-start-8">
                                    <RentalForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="py-10">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-y-6 md:gap-y-12 md:gap-x-12">
                            {items1.map((item, index) => (
                                <div className="col-span-12 md:col-span-4" key={index}>
                                    <div className="text-center">
                                        <div className="pb-6">
                                            <img src={item.image} className="h-12 m-auto" />
                                        </div>
                                        <h4 className="pb-4">{item.title}</h4>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="py-10">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-y-6 md:gap-y-12 md:gap-x-12 items-center">
                            <div className="col-span-12 md:col-span-8 lg:col-span-6">
                                <img src="/bmw.jpg" className="aspect-square object-cover rounded-4xl" />
                            </div>
                            <div className="col-span-12 lg:col-span-6 2xl:col-span-5 2xl:col-start-8">
                                <div>
                                    {[
                                        {
                                            title: 'Erat at semper',
                                            text: 'Non amet fermentum est in enim at sit ullamcorper. Sit elementum rhoncus nullam feugiat. Risus sem fermentum'
                                        },
                                        {
                                            title: 'Urna nec vivamus risus duis arcu ',
                                            text: 'Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum gravida ullamcorper'
                                        },
                                        {
                                            title: 'Lobortis euismod imperdiet tempus',
                                            text: 'Viverra scelerisque mauris et nullam molestie et. Augue adipiscing praesent nisl cras nunc luctus viverra nisi'
                                        },
                                        {
                                            title: 'Cras nulla aliquet nam eleifend amet et',
                                            text: 'Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum gravida ullamcorper sed integer. Quisque eleifend tincidunt vulputate libero'
                                        },
                                    ].map((item, index, array) => {
                                        const isLast = index === array.length - 1;
                                        return (
                                            <div className={`${isLast ? '' : 'pb-12'}`} key={index}>
                                                <div className="flex gap-4 items-center">
                                                    <div className="bg-majorelle-600 rounded-full text-white w-8 h-8 flex items-center justify-center font-semibold shrink-0">
                                                        {index + 1}
                                                    </div>
                                                    <div className="font-semibold">
                                                        <p className="text-xl">{item.title}</p>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 pt-4">{item.text}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="py-10">
                    <div className="container">
                        <div className="py-8 sm:py-24 px-4 sm:px-16 bg-gradient-to-r from-majorelle-900 to-majorelle-600 rounded-3xl text-white">
                            <div className="text-center max-w-2xl mx-auto">
                                <h2 className="mb-6">Facts in numbers</h2>
                                <p>Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien bibendum ullamcorper in. Diam tincidunt tincidunt erat at semper fermentum</p>
                            </div>
                            <div className="pt-12">
                                <div className="grid grid-cols-12 gap-6 md:gap-12">
                                    {[
                                        {
                                            title: '540+',
                                            text: 'Cars',
                                            icon: '/cars.svg',
                                        },
                                        {
                                            title: '20k+',
                                            text: 'Customers',
                                            icon: '/customers.svg',
                                        },
                                        {
                                            title: '25+',
                                            text: 'Years',
                                            icon: '/years.svg',
                                        },
                                        {
                                            title: '20m+',
                                            text: 'Miles',
                                            icon: '/miles.svg',
                                        },
                                    ].map((item, index) => (
                                        <div className="col-span-12 sm:col-span-6 xl:col-span-3" key={index}>
                                            <div className="bg-white rounded-2xl p-4 text-black">
                                                <div className="flex gap-4 items-center">
                                                    <div>
                                                        <div className="flex w-18 h-18 rounded-xl bg-california-500 flex items-center justify-center">
                                                            <img src={item.icon} className="h-10 w-10" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4>{item.title}</h4>
                                                        <p className="font-semibold text-gray-500">{item.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="py-10">
                    <div className="container">
                        <div className="">
                            <div className="text-center pb-12">
                                <h2>Reviews from our customers</h2>
                            </div>
                            <div className="">
                                <div className="grid grid-cols-12 gap-6">
                                    {[
                                        {
                                            name: 'Emanuel Boyle',
                                            company: 'Kuphal LLC',
                                            text: 'Et aliquet netus at sapien pellentesque mollis nec dignissim maecenas. Amet erat volutpat quisque odio purus feugiat. In gravida neque',
                                            image: '/testimonial_1.png',
                                        },
                                        {
                                            name: 'River Graves',
                                            company: 'Glover - Orn',
                                            text: 'Purus consectetur varius quis urna phasellus enim mattis. Sem tincidunt tortor nunc egestas amet adipiscing ligula',
                                            image: '/testimonial_2.png',
                                        },
                                        {
                                            name: 'Ryder Malone',
                                            company: 'Haag LLC',
                                            text: 'Quam neque odio urna euismod felis. Sit egestas magna in quisque famesdapibus quis sapien magna. Nisl non eget sit pellentesque tristique et',
                                            image: '/testimonial_3.png',
                                        },
                                    ].map((item, index, array) => {
                                        const isLast = index === array.length - 1;
                                        return (
                                            <div className="col-span-12 sm:col-span-6 xl:col-span-4" key={index}>
                                                <div className="rounded-3xl overflow-hidden">
                                                    <div className="p-6 lg:p-12 bg-lotion sm:h-80 pb-20">
                                                        <div className="pb-6">
                                                            <img src="/quotation.svg" className="h-8" />
                                                        </div>
                                                        <p className="text-center font-medium lg:text-lg">{item.text}</p>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                            <img src={item.image} className="h-24 w-24 rounded-full" />
                                                        </div>
                                                    </div>
                                                    <div className="px-6 lg:px-12 pt-16 pb-6 bg-majorelle-600 text-white text-center">
                                                        <p className="text-majorelle-200 font-light">{item.company}</p>
                                                        <p className="text-lg font-semibold">{item.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="py-10">
                    <div className="container">
                        <div className="max-w-5xl m-auto">
                            <div className="text-center pb-12">
                                <h2>Top Car Rental Questions</h2>
                            </div>
                            <div className="">
                                <div className="hs-accordion-group">

                                    {[
                                        {
                                            question: 'How does it work?',
                                            answer: 'Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus turpis nibh placerat massa. Fermentum urna ut at et in. Turpis aliquet cras hendrerit enim condimentum. Condimentum interdum risus bibendum urna. Augue aliquet varius faucibus ut integer tristique ut. Pellentesque id nibh sed nulla non nulla',
                                        },
                                        {
                                            question: 'Can I rent a car without a credit card?',
                                            answer: 'Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus turpis nibh placerat massa. Fermentum urna ut at et in. Turpis aliquet cras hendrerit enim condimentum. Condimentum interdum risus bibendum urna. Augue aliquet varius faucibus ut integer tristique ut. Pellentesque id nibh sed nulla non nulla',
                                        },
                                        {
                                            question: 'What are the requirements for renting a car?',
                                            answer: 'Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus turpis nibh placerat massa. Fermentum urna ut at et in. Turpis aliquet cras hendrerit enim condimentum. Condimentum interdum risus bibendum urna. Augue aliquet varius faucibus ut integer tristique ut. Pellentesque id nibh sed nulla non nulla',
                                        },
                                        {
                                            question: 'Does Car Rental allow me to tow with or attach a hitch to the rental vehicle?',
                                            answer: 'Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus turpis nibh placerat massa. Fermentum urna ut at et in. Turpis aliquet cras hendrerit enim condimentum. Condimentum interdum risus bibendum urna. Augue aliquet varius faucibus ut integer tristique ut. Pellentesque id nibh sed nulla non nulla',
                                        },
                                        {
                                            question: 'Does Car Rental offer coverage products for purchase with my rental?',
                                            answer: 'Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus turpis nibh placerat massa. Fermentum urna ut at et in. Turpis aliquet cras hendrerit enim condimentum. Condimentum interdum risus bibendum urna. Augue aliquet varius faucibus ut integer tristique ut. Pellentesque id nibh sed nulla non nulla',
                                        },
                                    ].map((item, index, array) => {
                                        const isLast = index === array.length - 1;
                                        return (
                                            <div className="hs-accordion bg-lotion mb-6 rounded-3xl md:text-lg" id={`hs-basic-no-arrow-heading-${index}`} key={index}>
                                                <button className="p-6 md:p-10 hs-accordion-toggle cursor-pointer hs-accordion-active:text-majorelle-600 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800" aria-expanded="false" aria-controls={`hs-basic-no-arrow-collapse-${index}`}>
                                                    {item.question}
                                                </button>
                                                <div id={`hs-basic-no-arrow-collapse-${index}`} className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby={`hs-basic-no-arrow-heading-${index}`}>
                                                    <p className="px-6 md:px-10 pb-6 md:pb-10">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
