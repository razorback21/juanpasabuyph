import { useRef } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import LinkButton from "@/Components/LinkButton";
import DataTable from "@/Components/DataTable";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import AlertConfirm from "@/Components/AlertConfirm";
import { Badge } from "@/Components/ui/badge";

export default function ({ orders }) {
    const dialogRef = useRef({});
    const columnHelper = createColumnHelper();
    const deleteHandler = (productCategory) => {
        router.delete(
            route("product-categories.destroy", productCategory) +
                window.location.search
        );
    };
    console.log("ORDERS TABLE", orders);
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
        columnHelper.accessor("customer.fullname", {
            cell: (row) => <span>{row.getValue()}</span>,
            header: () => <span>Customer</span>,
        }),
        columnHelper.accessor("status", {
            cell: (row) => (
                <Badge
                    variant={"outline"}
                    className={
                        row.getValue() === "cancelled"
                            ? "bg-red-600 text-white"
                            : row.getValue() === "shipped"
                            ? "bg-green-600 text-white"
                            : "bg-blue-600 text-white"
                    }
                >
                    {row.row.original.status}
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
                <DataTable columns={columns} data={orders.data} />
            </div>
        </>
    );
}
