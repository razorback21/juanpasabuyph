import Layout from "@/Pages/Store/components/Layout.jsx";
import { Link } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";

export default function ThankYou({ order }) {
    const [copied, setCopied] = useState(false);
    const copiedMessageRef = useRef(null);

    const handleCopyOrderNumber = async () => {
        try {
            await navigator.clipboard.writeText(order.order_number);
            setCopied(true);
        } catch (error) {
            console.error("Failed to copy order number:", error);
            // Fallback for older browsers
            try {
                const textArea = document.createElement("textarea");
                textArea.value = order.order_number;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
                setCopied(true);
            } catch (fallbackError) {
                console.error("Fallback copy failed:", fallbackError);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (copiedMessageRef.current && !copiedMessageRef.current.contains(event.target)) {
                setCopied(false);
            }
        };

        if (copied) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [copied]);
    return (
        <Layout title="Thank You">
            <div className="flex items-center justify-between md:px-10 py-4">
                <div className="w-full max-w-2xl mx-auto">
                    {" "}
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <div className="text-center">
                            <div className="flex justify-center thank_you_icon">
                                <svg
                                    className="text-green-500"
                                    fill="currentColor"
                                    height="64"
                                    viewBox="0 0 256 256"
                                    width="64"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-120.34a8,8,0,0,1,0,11.32l-80,80a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L88,154.34l74.34-74.34A8,8,0,0,1,173.66,95.66Z"></path>
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold mb-2">
                                Thank you for your order!
                            </h1>
                            <p className="text-lg text-gray-600">
                                Your order has been successfully placed. We will
                                contact you shortly to verify your details.
                            </p>
                        </div>
                        <div className="order_details mt-8">
                            <h2 className="text-lg font-semibold mb-4">
                                Order Summary
                            </h2>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-none">
                                <span className="text-gray-600">
                                    Order Number
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                        #{order.order_number}
                                    </span>
                                    <button
                                        onClick={handleCopyOrderNumber}
                                        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        aria-label="Copy order number"
                                        title="Copy order number"
                                    >
                                        <svg
                                            className="w-5 h-5 text-gray-500 hover:text-gray-700"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </button>
                                    {copied && (
                                        <span
                                            ref={copiedMessageRef}
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 animate-pulse"
                                        >
                                            Copied!
                                        </span>
                                    )}
                                </div>
                            </div>
                            {order.items.map((item, index) => (
                                <div
                                    key={item.id || index}
                                    className="flex justify-between items-center py-3 border-b border-gray-200 last:border-none"
                                >
                                    <span className="text-gray-600">
                                        {item.product.name}
                                    </span>
                                    <span className="font-medium">
                                        {item.product.price.toLocaleString(
                                            "en-US",
                                            {
                                                style: "currency",
                                                currency: "PHP",
                                            },
                                        )}{" "}
                                        x {item.quantity}
                                    </span>
                                </div>
                            ))}{" "}
                            <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-none">
                                <span className="text-gray-600">
                                    Items Purchased
                                </span>
                                <span className="font-medium">
                                    {order.items.length}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-none">
                                <span className="text-gray-600">
                                    Total Cost
                                </span>
                                <span className="font-medium">
                                    {order.total.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "PHP",
                                    })}
                                </span>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="w-full sm:w-auto flex-grow px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition duration-200 rounded-sm">
                                Order Summary
                            </button>

                            <Link href={route("catalog")}>
                                <button className="w-full sm:w-auto flex-grow px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-200 rounded-sm">
                                    Continue Shopping
                                </button>
                            </Link>
                            <Link href={route("home")}>
                                <button className="w-full sm:w-auto flex-grow px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-200 rounded-sm">
                                    Return to Homepage
                                </button>
                            </Link>
                        </div>

                        <div className="mt-10">
                            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4 md:p-5 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <svg
                                            className="w-6 h-6 text-amber-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-base md:text-lg font-semibold text-amber-800 leading-relaxed">
                                            Please take note of the order number for future reference.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
