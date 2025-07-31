import { useRef, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "@/Components/DataTable";
import { Link, router } from "@inertiajs/react";
import AlertConfirm from "@/Components/AlertConfirm";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function ({ order, statusCantBeDeleted, readOnly = false }) {
    const dialogRef = useRef({});
    const columnHelper = createColumnHelper();
    const quantityHandler = (item, quantity) => {
        router.put(
            route("order-items.update", {
                order_item: item,
                quantity: quantity,
            }),
            {
                onSuccess: () => {
                    //setQuantity(e.target.value);
                },
            }
        );
    };

    function QuantityField({ row }) {
        const [isError, setIsError] = useState(false);
        const [quantity, setQuantity] = useState(row.getValue());
        const [message, setMessage] = useState("");
        const inputRef = useRef(null);

        const validateQuantity = (e) => {
            let enteredQuantity = Number(e.target.value);

            enteredQuantity;

            if (!enteredQuantity) {
                setMessage("Minimum quantity is 1");
                setIsError(true);
                return;
            }
            if (enteredQuantity > row.row.original.product.available_stock) {
                setMessage("Quantity exceeds stock");
                setIsError(true);
                return;
            }
            setQuantity(enteredQuantity);
            setIsError(false);
            return;
        };

        return (
            <>
                <Input
                    className="text-center"
                    ref={inputRef}
                    defaultValue={quantity}
                    onChange={(e) => {
                        validateQuantity(e);
                        !isError &&
                            Number(e.target.value) &&
                            quantityHandler(row.row.original, e.target.value);
                    }}
                    onBlur={(e) => {
                        validateQuantity(e);
                        isError && inputRef.current.focus();
                        !isError &&
                            Number(e.target.value) > 0 &&
                            quantityHandler(row.row.original, e.target.value);
                    }}
                    type="number"
                    min={1}
                    max={row.row.original.product.available_stock}
                    readOnly={readOnly}
                />
                {isError && (
                    <p className="my-1 text-red-500 text-center text-sm">
                        {message}
                    </p>
                )}
            </>
        );
    }

    function deleteOrderItem(order_item) {
        dialogRef.current.open({
            title: `Delete #${order_item.product.name} (Qty. ${order_item.quantity}) `,
            description: "Are you sure you want to delete this line item?",
            buttonName: "Yes delete it.",
            onContinue: () => {
                router.delete(
                    route("order-items.destroy", {
                        order_item: order_item,
                    })
                );
            },
        });
    }

    const columns = [
        columnHelper.accessor("product.name", {
            cell: (row) => <span>{row.getValue()}</span>,
            header: () => <span>Item</span>,
        }),
        columnHelper.accessor("quantity", {
            cell: (row) => <QuantityField row={row} />,
            header: () => <span>Quantity</span>,
        }),
        columnHelper.accessor("price", {
            cell: (row) => <span>{row.getValue()}</span>,
            header: () => <span>Price</span>,
        }),
        columnHelper.accessor("total", {
            cell: (row) => <span>{row.getValue().toFixed(2)}</span>,
            header: () => <span>Total</span>,
        }),
        columnHelper.accessor("action", {
            cell: (row) => {
                return (
                    <div className="text-center">
                        <Button
                            type="button"
                            disabled={
                                statusCantBeDeleted.includes(order.status) ||
                                readOnly
                            }
                            variant="destructive"
                            onClick={() => deleteOrderItem(row.row.original)}
                        >
                            Delete
                        </Button>
                    </div>
                );
            },
            header: () => <span>Action</span>,
        }),
    ];

    return (
        <>
            <div>
                <AlertConfirm ref={dialogRef}></AlertConfirm>
                <DataTable columns={columns} data={order.items} />
                <div className="flex justify-end p-3">
                    <h2 className="text-2xl text-gray-500">
                        Total:{" "}
                        {order.total.toLocaleString("en-PH", {
                            style: "currency",
                            currency: "PHP",
                        })}
                    </h2>
                </div>
                <div className="p-3 bg-red-50 my-4 border border-red-200 rounded-sm">
                    <p className="text-red-400 text-[12px]">
                        <span className="font-bold">IMPORTANT: </span>Deleting
                        all order items will also delete the order from the
                        system.
                    </p>
                </div>
                <div>
                    <Button
                        disabled={statusCantBeDeleted.includes(order.status)}
                        onClick={() =>
                            dialogRef.current.open({
                                title: `Delete Order #${order.order_number}`,
                                description:
                                    "Are you sure you want to delete this order",
                                buttonName: "Yes delete it.",
                                onContinue: () => {
                                    router.delete(
                                        route("orders.destroy", order),
                                        {
                                            onSuccess: (page) => {
                                                const props = page.props;
                                                if (props.flash.message) {
                                                    dialogRef.current.open({
                                                        title: "Error",
                                                        description:
                                                            props.flash.message,
                                                    });
                                                }
                                            },
                                            onError: (error) => {
                                                dialogRef.current.open({
                                                    title: "Error",
                                                    description:
                                                        "Error deleting order.",
                                                });
                                                console.log(error);
                                            },
                                        }
                                    );
                                },
                            })
                        }
                    >
                        DELETE ORDER
                    </Button>
                </div>
            </div>
        </>
    );
}
