import Layout from "@/Pages/Store/components/Layout.jsx";
import { Link } from "@inertiajs/react";
export default function ({ order }) {
    return (
        <Layout title="Thank You">
            <div className="flex items-center justify-between px-10 py-4">
                <div className="w-full max-w-2xl text mx-auto">
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
                                <span className="font-medium">
                                    #{order.order_number}
                                </span>
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
                                            }
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
                            <button className="w-full sm:w-auto flex-grow text-white bg-red-500 rounded-sm">
                                Order Details
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
                            <p className="text-center text-gray-600">
                                Please take note of the order number for future
                                reference.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
