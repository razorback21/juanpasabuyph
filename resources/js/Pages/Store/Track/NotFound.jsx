import Layout from "@/Pages/Store/components/Layout.jsx";
import { useRef } from "react";
import { router } from "@inertiajs/react";

export default function NotFound({ order }) {
    const orderNumberRef = useRef(null);
    const inputRef = useRef(null);

    function handleOrderTracking(e) {
        const orderNumber = inputRef.current.value.trim();
        if (orderNumber === "") {
            inputRef.current.focus();
            return;
        }
        router.get(route("track", { order_id: orderNumber }));
    }

    return (
        <Layout title="Track Order">
            <div className="container flex items-center mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 text-center">
                        <div className="inline-block p-5 bg-gray-200 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="64"
                                height="64"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ef4444"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-search-x-icon lucide-search-x"
                            >
                                <path d="m13.5 8.5-5 5" />
                                <path d="m8.5 8.5 5 5" />
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold  mb-4">
                            {" "}
                            Order Not Found
                        </h1>
                        <p className="text-lg text-gray-500 mb-8">
                            We couldn't find an order matching the provided
                            information. Please double-check your order details
                            or try searching again.
                        </p>
                        <div className="flex justify-center mb-4">
                            {" "}
                            <input
                                ref={inputRef}
                                className="w-full max-w-sm px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 font-bold focus:ring-[var(--primary-color)] placeholder:font-normal placeholder:capitalize uppercase placeholder:text-gray-400"
                                placeholder="Enter your order number"
                                type="text"
                                onChange={(e) => {
                                    orderNumberRef.current = e.target.value;
                                }}
                            />
                            <button
                                onClick={handleOrderTracking}
                                class="bg-red-500 text-white px-6 hover:bg-red-600 py-3 rounded-r-full -ml-1"
                            >
                                Track Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
