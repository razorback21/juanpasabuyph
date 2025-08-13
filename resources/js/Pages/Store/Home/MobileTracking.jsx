import { useRef } from "react";
import { router } from "@inertiajs/react";

export default function MobileTracking() {
    const trackRef = useRef(null);

    function handleOrderTracking(e) {
        router.get(route("track", { order_id: trackRef.current.value }));
    }

    return (
        <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg max-w-2xl w-full border border-gray-200">
            <h2 className="text-xs font-medium text-gray-500 mb-4 uppercase tracking-wide text-center">
                Track Your Order
            </h2>
            <form className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M2 6h4" />
                            <path d="M2 10h4" />
                            <path d="M2 14h4" />
                            <path d="M2 18h4" />
                            <rect width="16" height="20" x="4" y="2" rx="2" />
                            <path d="M9.5 8h5" />
                            <path d="M9.5 12H16" />
                            <path d="M9.5 16H14" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="w-full text-center py-3 rounded-md border border-[#d1d5db] bg-white pl-10 pr-4 text-lg text-gray-600 font-extrabold placeholder:font-normal placeholder:text-gray-400 focus:outline-none transition-colors"
                        placeholder="Enter your order number"
                        defaultValue=""
                        ref={trackRef}
                    />
                </div>
                <button
                    onClick={handleOrderTracking}
                    type="button"
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    aria-label="Submit"
                >
                    Track
                </button>
            </form>
        </div>
    );
}
