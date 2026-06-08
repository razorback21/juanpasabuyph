import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "@/components/DataTable";
import { Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

export default function ProductsTable({ products }) {
    const columnHelper = createColumnHelper();

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
                </Link>
            ),
            header: () => <span>Name</span>,
        }),
        columnHelper.accessor("available_stock", {
            cell: (product) => (
                <Badge variant="outline" className="text-xs font-semibold text-red-600 bg-red-50 border-red-200">
                    {product.getValue() ?? 0}
                </Badge>
            ),
            header: () => <span>Stock</span>,
        }),
        columnHelper.accessor("product_category", {
            cell: (product) => (
                <span className="text-sm text-gray-500">
                    {product.row.original.category?.name}
                </span>
            ),
            header: () => <span>Category</span>,
        }),
        columnHelper.accessor("description", {
            cell: (product) => (
                <span className="text-sm text-gray-500 line-clamp-2">
                    {product.getValue()}
                </span>
            ),
            header: () => <span>Description</span>,
            size: 270,
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
    ];

    return <DataTable columns={columns} data={products} />;
}
