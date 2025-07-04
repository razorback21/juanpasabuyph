import { useRef } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import LinkButton from "@/Components/LinkButton";
import DataTable from "@/Components/DataTable";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import AlertConfirm from "@/Components/AlertConfirm";

export default function ({ categories }) {
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
            cell: (row) => <span>{row.getValue()}</span>,
            header: () => <span>Name</span>,
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
                            dialogRef.current?.setDialogProps({
                                title: `${row.row.original.name}`,
                                description: `Are you sure you want to to delete category?`,
                                onContinue: () =>
                                    deleteHandler(row.row.original),
                            });
                            dialogRef.current?.open();
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
