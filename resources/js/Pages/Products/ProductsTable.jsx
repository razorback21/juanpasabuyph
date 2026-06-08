import { useState, useRef } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Dropdown from "@/components/Dropdown";
import DataTable from "@/components/DataTable";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Pencil, Trash2, Filter } from "lucide-react";

export default function ProductsTable({
    products,
    categories,
    active_category,
}) {
    const columnHelper = createColumnHelper();

    const deleteHandler = (row) => {
        router.delete(route("products.destroy", row) + window.location.search, {
            onSuccess: () => {
                toast.success("Product deleted!");
            },
            onError: () => {
                toast.error("Failed to delete product.");
            },
        });
    };

    const columns = [
        columnHelper.accessor("thumbnail_url", {
            cell: (product) => (
                <Link
                    href={route("products.show", {
                        product: product.row.original,
                    })}
                >
                    {product.getValue() ? (
                        <img
                            src={product.getValue()}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                            <Package size={16} className="text-gray-400" />
                        </div>
                    )}
                </Link>
            ),
            header: () => <span>Image</span>,
        }),
        columnHelper.accessor("name", {
            cell: (product) => (
                <Link
                    href={route("products.show", {
                        product: product.row.original,
                    })}
                    className="group"
                >
                    <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                        {product.getValue()}
                    </span>
                    {product.row.original.disabled && (
                        <Badge variant="secondary" className="ml-2">Disabled</Badge>
                    )}
                </Link>
            ),
            header: () => <span>Name</span>,
        }),
        columnHelper.accessor("available_stock", {
            cell: (product) => {
                const stock = product.getValue() ?? 0;
                const color = stock === 0 ? "text-red-600" : stock <= 10 ? "text-amber-600" : "text-gray-900";
                return <span className={`text-sm font-medium ${color}`}>{stock}</span>;
            },
            header: () => <span>Stocks</span>,
        }),
        columnHelper.accessor("product_category", {
            cell: (product) => (
                <span className="text-sm text-gray-500">{product.getValue()}</span>
            ),
            header: () => <span>Category</span>,
        }),
        columnHelper.accessor("description", {
            cell: (product) => (
                <span className="text-sm text-gray-500 line-clamp-2">{product.getValue()}</span>
            ),
            header: () => <span>Description</span>,
            size: 270,
        }),
        columnHelper.accessor("is_featured", {
            cell: (product) =>
                !product.getValue() ? (
                    ""
                ) : (
                    <Badge variant="secondary" className="text-xs">Yes</Badge>
                ),
            header: () => <span>Feat. Product</span>,
        }),
        columnHelper.accessor("price", {
            cell: (product) => (
                <span className="text-sm font-medium">
                    ₱{Number(product.getValue()).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>
            ),
            header: () => <span>Price</span>,
        }),
        columnHelper.accessor("actions", {
            cell: (product) => (
                <div className="flex items-center justify-end gap-1">
                    <Link
                        href={route("products.edit", {
                            product: product.row.original,
                        })}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                    >
                        <Pencil size={14} />
                    </Link>
                    <button
                        type="button"
                        onClick={() => {
                            if (!confirm(`Delete "${product.row.original.name}"?`)) return;
                            deleteHandler(product.row.original);
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

    return (
        <>
            <DataTable columns={columns} data={products.data} />
        </>
    );
}

ProductsTable.FilterButton = function FilterButton({ categories, activeCategory }) {
    return (
        <Dropdown align="left" width="48">
            <Dropdown.Trigger>
                <Button variant="outline" size="sm" className="gap-1.5">
                    <Filter size={14} />
                    {activeCategory}
                </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Link href={route("products.index")}>
                    All
                </Dropdown.Link>
                {categories.map((category) => (
                    <Dropdown.Link
                        key={category.id}
                        href={
                            route("products.index") +
                            "?category=" +
                            category.id +
                            "&active_category=" +
                            category.name
                        }
                    >
                        {category.name}
                    </Dropdown.Link>
                ))}
            </Dropdown.Content>
        </Dropdown>
    );
};
