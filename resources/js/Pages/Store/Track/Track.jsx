import Layout from "@/Pages/Store/components/Layout.jsx";
import { dateFormatFriendly } from "@/lib/date";
import { currencyFormat } from "@/lib/number";

export default function Track({ order }) {
    function timelineLabel(status) {
        switch (status) {
            case "placed":
                return "Order Placed";
            case "processing":
                return "Processing";
            case "shipped":
                return "Shipped";
            case "delivered":
                return "Delivered";
            default:
                return "pending";
        }
    }

    return (
        <Layout title="Track Order">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <a
                                className="hover:text-[var(--primary-color)]"
                                href="#"
                            >
                                Orders
                            </a>
                            <span className="mx-2">/</span>
                            <span className="text-[var(--text-primary)]">
                                Order Details
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold">
                            Order #{order.order_number}
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Estimated Delivery:{" "}
                            <span className="text-[var(--text-primary)] font-semibold">
                                {dateFormatFriendly(
                                    order.estimated_delivery_date
                                ) ?? "N/A"}
                            </span>
                        </p>
                    </div>

                    <div className="rounded-xl shadow-lg p-8 mb-12 border border-gray-200">
                        <div className="relative">
                            <div className="absolute left-5 top-0 h-full w-0.5 bg-red-200"></div>
                            <div className="space-y-12">
                                {order.timeline.map((item) => {
                                    {
                                        if (item.status != "shipped") {
                                            return (
                                                <div className="timeline-item relative flex items-start active">
                                                    <div className="timeline-icon flex-shrink-0 w-10 h-10 rounded-full border-2 bg-white border-red-500 flex items-center justify-center z-10">
                                                        <div className="timeline-icon-inner w-5 h-5 rounded-full bg-red-500"></div>
                                                    </div>
                                                    <div className="ml-6">
                                                        <h3 className="timeline-title text-lg font-semibold text-gray-900">
                                                            {timelineLabel(
                                                                item.status
                                                            )}
                                                        </h3>
                                                        <p className="timeline-description text-gray-500 text-sm">
                                                            {dateFormatFriendly(
                                                                order.created_at
                                                            )}
                                                        </p>
                                                        {item.description && (
                                                            <p className="timeline-description text-gray-500 text-[12px]">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div className="timeline-item relative flex items-start">
                                                    <div className="timeline-icon flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-green-500 flex items-center justify-center z-10">
                                                        <div className="timeline-icon-inner w-5 h-5 rounded-full bg-green-500"></div>
                                                    </div>
                                                    <div className="ml-6">
                                                        <h3 className="timeline-title text-lg font-semibold text-gray-500">
                                                            {timelineLabel(
                                                                item.status
                                                            )}
                                                        </h3>
                                                        <p className="timeline-description text-gray-500 text-sm">
                                                            {dateFormatFriendly(
                                                                item.created_at
                                                            )}
                                                        </p>
                                                        {item.description && (
                                                            <p className="timeline-description text-gray-500 text-[12px]">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }
                                })}
                                {/* <div className="timeline-item relative flex items-start active">
                                    <div className="timeline-icon flex-shrink-0 w-10 h-10 rounded-full border-2 bg-white border-red-500 flex items-center justify-center z-10">
                                        <div className="timeline-icon-inner w-5 h-5 rounded-full bg-red-500"></div>
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="timeline-title text-lg font-semibold text-gray-900">
                                            Processing
                                        </h3>
                                        <p className="timeline-description text-gray-500 text-sm">
                                            July 11, 2024
                                        </p>
                                    </div>
                                </div> */}
                                {/* <div className="timeline-item relative flex items-start active">
                                    <div className="timeline-icon flex-shrink-0 w-10 h-10 rounded-full border-2 bg-white border-red-500 flex items-center justify-center z-10">
                                        <div className="timeline-icon-inner w-5 h-5 rounded-full bg-red-500"></div>
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="timeline-title text-lg font-semibold text-gray-900">
                                            Shipped
                                        </h3>
                                        <p className="timeline-description text-gray-500 text-sm">
                                            July 12, 2024
                                        </p>
                                    </div>
                                </div> */}
                                {/* <div className="timeline-item relative flex items-start">
                                    <div className="timeline-icon flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10">
                                        <div className="timeline-icon-inner w-5 h-5 rounded-full bg-gray-200"></div>
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="timeline-title text-lg font-semibold text-gray-500">
                                            Delivered
                                        </h3>
                                        <p className="timeline-description text-gray-500 text-sm">
                                            Awaiting delivery
                                        </p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-bold mb-4">
                                Order Summary
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Order Date
                                    </span>
                                    <span>
                                        {dateFormatFriendly(order.created_at)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Total</span>
                                    <span className="font-semibold">
                                        {currencyFormat(order.total)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Shipping Address
                                    </span>
                                    <span className="text-right">
                                        {order.customer.address}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-bold mb-4">Items</h3>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div
                                        className="flex items-center gap-4"
                                        key={item.id}
                                    >
                                        <div
                                            className="w-16 h-16 rounded-lg bg-gray-200 bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url("${item.product.thumbnail_url}")`,
                                            }}
                                        ></div>
                                        <div>
                                            <p className="font-semibold">
                                                {item.product.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {currencyFormat(
                                                    item.product.price
                                                )}{" "}
                                                x {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {/* <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-lg bg-gray-200 bg-cover bg-center"></div>
                                    <div>
                                        <p className="font-semibold">
                                            Comfortable Running Shoes
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Size 8
                                        </p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
