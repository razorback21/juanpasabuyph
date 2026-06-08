import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "@/components/DataTable";
import { Link, router } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

export default function ProductCategoriesTable({ categories }) {
    const columnHelper = createColumnHelper();

    const deleteHandler = (category) => {
        router.delete(
            route("product-categories.destroy", category) +
                window.location.search,
            {
                onSuccess: () => {
                    toast.success("Category deleted!");
                },
                onError: () => {
                    toast.error("Failed to delete category.");
                },
            }
        );
    };

    const columns = [
        columnHelper.accessor("name", {
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                        {row.getValue()}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                        {row.row.original.products_count}
                    </Badge>
                </div>
            ),
            header: () => <span>Name</span>,
        }),
        columnHelper.accessor("description", {
            cell: (row) => (
                <span className="text-sm text-gray-500 line-clamp-2">
                    {row.getValue()}
                </span>
            ),
            header: () => <span>Description</span>,
        }),
        columnHelper.accessor("actions", {
            cell: (row) => (
                <div className="flex items-center justify-end gap-1">
                    <Link
                        href={route("product-categories.edit", row.row.original.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                    >
                        <Pencil size={14} />
                    </Link>
                    <button
                        type="button"
                        onClick={() => {
                            if (!confirm(`Delete "${row.row.original.name}"?`)) return;
                            deleteHandler(row.row.original);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-red-200 bg-white text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            ),
            header: () => <div className="flex justify-end">Actions</div>,
        }),
    ];

    return <DataTable columns={columns} data={categories} />;
}
