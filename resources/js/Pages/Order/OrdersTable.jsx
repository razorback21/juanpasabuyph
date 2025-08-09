import { useRef, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "@/components/DataTable";
import { Link, router } from "@inertiajs/react";
import AlertConfirm from "@/components/AlertConfirm";
import { Badge } from "@/components/ui/badge";
import { badgeStatusColor } from "@/lib/order";
import { Input } from "@/components/ui/input";

export default function OrdersTable({ orders }) {
    const dialogRef = useRef({});
    const inputQueryRef = useRef({});
    const queryRef = useRef({});
    const columnHelper = createColumnHelper();

    useEffect(() => {
        inputQueryRef.current.focus();
    }, []);

    const columns = [
        columnHelper.accessor("order_number", {
            cell: (row) => {
                return (
                    <Link
                        href={route("orders.show", row.row.original)}
                        className="hover:underline font-bold"
                    >
                        {row.row.original.order_number}
                    </Link>
                );
            },
            header: () => <span>Order # </span>,
        }),
        columnHelper.accessor("created_at", {
            cell: (row) => {
                return (
                    <span>{new Date(row.getValue()).toLocaleDateString()}</span>
                );
            },
            header: () => <span>Date</span>,
        }),
        columnHelper.accessor("fullname", {
            cell: (row) => <span>{row.getValue()}</span>,
            header: () => <span>Customer</span>,
        }),
        columnHelper.accessor("status", {
            cell: (row) => (
                <Badge
                    variant={"outline"}
                    className={badgeStatusColor(row.getValue())}
                >
                    {row.row.original.status.toString().toUpperCase()}
                </Badge>
            ),
            header: () => <span>Status</span>,
        }),
        columnHelper.accessor("notes", {
            cell: (row) => <span>{row.getValue()}</span>,
            header: () => <span>Notes</span>,
        }),
    ];

    return (
        <>
            <div>
                <AlertConfirm ref={dialogRef}></AlertConfirm>
                <div className="my-2">
                    <Input
                        ref={inputQueryRef}
                        defaultValue={new URLSearchParams(
                            window.location.search
                        ).get("query")}
                        placeholder="Search orders..."
                        className="w-full font-bold"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                queryRef.current.value = e.target.value;

                                router.get(
                                    route("orders.index") +
                                        "?query=" +
                                        e.target.value
                                );
                            }
                        }}
                    />
                </div>
                <DataTable columns={columns} data={orders.data} />
            </div>
        </>
    );
}
