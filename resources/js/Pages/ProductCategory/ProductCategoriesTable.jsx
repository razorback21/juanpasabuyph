import { useRef } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import LinkButton from "@/components/LinkButton";
import DataTable from "@/components/DataTable";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AlertConfirm from "@/components/AlertConfirm";
import { Badge } from "@/components/ui/badge";

export default function ProductCategoriesTable({ categories }) {
    const dialogRef = useRef({});
    const columnHelper = createColumnHelper();
    const deleteHandler = (productCategory) => {
        router.delete(
            route("product-categories.destroy", productCategory) +
                window.location.search
        );
    };

    const columns = [
        columnHelper.accessor("name", {
            cell: (row) => (
                <span>
                    {row.getValue()}{" "}
                    <Badge variant="secondary">
                        {row.row.original.products_count}
                    </Badge>
                </span>
            ),
            header: () => <span>Name </span>,
        }),
        columnHelper.accessor("description", {
            cell: (row) => <span>{row.getValue()}</span>,
            header: () => <span>Description</span>,
        }),
        columnHelper.accessor("actions", {
            cell: (row) => (
                <div className="flex items-center justify-end gap-2">
                    <LinkButton
                        href={route(
                            "product-categories.edit",
                            row.row.original.id
                        )}
                    >
                        Edit
                    </LinkButton>
                    <Button
                        onClick={() => {
                            dialogRef.current?.open({
                                title: `${row.row.original.name}`,
                                description: `Are you sure you want to delete this product category?`,
                                buttonName: "Yes delete it.",
                                onContinue: () =>
                                    deleteHandler(row.row.original),
                            });
                        }}
                        type="button"
                        className="bg-red-600 hover:bg-red-500"
                    >
                        Delete
                    </Button>
                </div>
            ),
            header: () => <div className="flex justify-end mr-2">Actions</div>,
        }),
    ];

    return (
        <>
            <div className="flex justify-end mb-2">
                <Link href={route("product-categories.create")}>
                    <Button className="ml-2">+ Add Category</Button>
                </Link>
            </div>
            <div>
                <AlertConfirm ref={dialogRef}></AlertConfirm>
                <DataTable columns={columns} data={categories} />
            </div>
        </>
    );
}
