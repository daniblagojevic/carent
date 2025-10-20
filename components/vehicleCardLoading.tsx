export default function VehicleCardLoading() {
    return (
        <>
            <div className="rounded-3xl  bg-lotion flex flex-col justify-between p-6 animate-pulse">
                <div className="pb-6">
                    <div className="h-48 bg-gray-200 rounded"></div>
                </div>
                <div className="">
                    <div className="flex flex-col">
                        <div className="pb-6">
                            <div className="pb-4">
                                <div className="flex flex-wrap gap-4">
                                    <div className="w-full md:flex-1">
                                        <h4 className="mb-2">
                                            <div className="h-6 bg-gray-200 rounded-lg w-full"></div>
                                        </h4>
                                        <div className="text-gray-500 text-sm">
                                            <div className="h-4 bg-gray-200 rounded-lg w-20"></div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-auto text-end">
                                        <div className="text-xl font-semibold text-majorelle-600 mb-2">
                                            <div className="h-6 bg-majorelle-300 rounded-lg w-20"></div>
                                        </div>
                                        <div className="text-gray-500 text-sm">
                                            <div className="h-4 bg-gray-200 rounded-lg w-20"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-wrap gap-5">
                                    <div className="h-6 bg-gray-200 rounded-lg w-full"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="h-12 bg-majorelle-300 rounded-lg w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
