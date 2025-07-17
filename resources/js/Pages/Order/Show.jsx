import { useEffect, useRef } from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Toaster } from "@/components/ui/sonner";
import OrdersTableShow from "./OrdersTableShow";
import { Label } from "@/components/ui/label";

export default function EditProduct({ order }) {
    const props = usePage().props;
    const dialogRef = useRef(null);
    const formRef = useRef(null);
    console.log("ORDER items", order.items);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Order
                </h2>
            }
        >
            <Head title={`Edit - ${order.order_number}`} />
            <Toaster />
            <div className="flex flex-col px-2 lg:px-12">
                <div className="flex flex-col gap-8 px-0 mx-auto">
                    <div className="flex flex-col gap-2 border-b pb-6">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            Order #{order.order_number}
                        </h1>
                        <div className="flex items-center gap-4 text-gray-500 text-sm">
                            <span>
                                Placed on{" "}
                                {new Date(
                                    order.created_at
                                ).toLocaleDateString()}
                            </span>
                            <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                            <span
                                className={`font-semibold uppercase tracking-wide ${
                                    order.status === "cancelled"
                                        ? "text-red-600"
                                        : order.status === "shipped"
                                        ? "text-green-600"
                                        : "text-yellow-600"
                                }`}
                            >
                                {order.status}
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap2 my-4">
                        <div>
                            <Label>Customer: {order.customer.fullname}</Label>
                            <br />
                            <Label>Phone: {order.customer.phone}</Label>
                            <br />
                            <Label>
                                Email:{" "}
                                <a
                                    href={`mailto:${order.customer.email}`}
                                    className="underline"
                                >
                                    {order.customer.email}
                                </a>
                            </Label>{" "}
                            <br />
                        </div>
                        <div>
                            <Label>Address: {order.customer.address}</Label>
                            <br />
                        </div>
                    </div>
                </div>

                {order.notes.trim() && (
                    <div className="my-4">
                        <div className="flex flex-col gap-2 my-4">
                            <Label>
                                <strong>Notes:</strong> {order.notes}
                            </Label>
                        </div>
                        <OrdersTableShow order={order} />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
