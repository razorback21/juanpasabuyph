import { createColumnHelper } from "@tanstack/react-table";
import LinkButton from "@/Components/LinkButton";
import DataTable from "@/Components/DataTable";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

export default function ({ categories }) {
    const columnHelper = createColumnHelper();

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
                        href={route("product-categories.edit", row.row.original.id)}
                    >
                        Edit
                    </LinkButton>
                    <LinkButton
                        href={
                            route(
                                "product-categories.destroy",
                                row.row.original
                            ) + window.location.search
                        }
                        type="button"
                        method="DELETE"
                        className="bg-red-600 hover:bg-red-500"
                    >
                        Delete
                    </LinkButton>
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
                <DataTable columns={columns} data={categories} />
            </div>
        </>
    );
}
