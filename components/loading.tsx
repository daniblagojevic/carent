export default function Loading() {
    return (
        <>
            <section>
                <div className="flex justify-center items-center h-96">
                    <div className="flex justify-center">
                        <div className="animate-spin inline-block size-12 border-3 border-current border-t-transparent text-majorelle-600 rounded-full" role="status" aria-label="loading">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}