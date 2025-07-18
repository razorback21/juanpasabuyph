import { useState, useRef } from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Toaster } from "@/components/ui/sonner";
import OrdersTableShow from "./OrdersTableShow";
import { Label } from "@/components/ui/label";
import { GenericDialog } from "@/Components/GenericDialog";
import Textarea from "@/Components/Textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ({ order, statusOptions }) {
    const props = usePage().props;
    const statusRef = useRef({
        order: order,
        status: order.status,
        description: "",
    });

    const genericDialogRef = useRef(null);
    console.log("ORDER items", statusOptions);

    function handleUpdateStatus() {
        router.post(route("order-status-timelines.store", statusRef.current), {
            onSuccess: () => {
                genericDialogRef.current.close();
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }

    function OrderStatus({ statusOptions }) {
        const [orderStatus, setOrderStatus] = useState(order.status);

        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="outline" className="w-full">
                        {orderStatus.toUpperCase()}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {Object.entries(statusOptions).map(([index, status]) => {
                        return (
                            <DropdownMenuItem
                                key={status}
                                onClick={() => {
                                    setOrderStatus(status);
                                    statusRef.current.status = status;
                                }}
                            >
                                {status.toString().toUpperCase()}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

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
            <GenericDialog ref={genericDialogRef}>
                <label>Status</label>
                <OrderStatus statusOptions={statusOptions} />
                <label>Description</label>
                <Textarea
                    onChange={(e) => {
                        statusRef.current.description = e.target.value;
                    }}
                />
            </GenericDialog>
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
                            <Badge
                                variant="outline"
                                onClick={() => {
                                    if (
                                        order.status === "cancelled" ||
                                        order.status === "shipped"
                                    ) {
                                        return;
                                    }
                                    genericDialogRef.current.open({
                                        title: "Update Order Status",
                                        actionHandler: handleUpdateStatus,
                                    });
                                }}
                                className={`font-semibold uppercase tracking-wide text-white cursor-pointer ${
                                    order.status === "cancelled"
                                        ? "bg-red-600"
                                        : order.status === "shipped"
                                        ? "bg-green-600"
                                        : "bg-blue-600"
                                }`}
                            >
                                {order.status}
                            </Badge>
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
