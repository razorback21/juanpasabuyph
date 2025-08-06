import { useRef } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "@/components/DataTable";
import { Link } from "@inertiajs/react";
import AlertConfirm from "@/components/AlertConfirm";
import { Switch } from "@/components/ui/switch";
import Axios from "@/lib/axios";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function ({ products }) {
    const columnHelper = createColumnHelper();
    const dialogRef = useRef(null);

    const columns = [
        columnHelper.accessor("featured_image_url", {
            cell: (product) => (
                <Link
                    href={route("products.show", {
                        product: product.row.original,
                    })}
                    className="hover:underline cursor-pointer"
                >
                    <img
                        src={product.getValue()}
                        alt={product.getValue()}
                        className="w-12 h-12 rounded-[10px]"
                    />
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
                    className="hover:underline cursor-pointer"
                >
                    <div>{product.getValue()}</div>
                </Link>
            ),
            header: () => <span>Name</span>,
        }),
        columnHelper.accessor("available_stock", {
            cell: (product) => product.getValue(),
            header: () => <span>Stocks</span>,
        }),
        columnHelper.accessor("product_category", {
            cell: (product) => product.row.original.category.name,
            header: () => <span>Category</span>,
        }),
        columnHelper.accessor("description", {
            cell: (product) => product.getValue(),
            header: () => <div>Description</div>,
            size: 270,
        }),
        columnHelper.accessor("price", {
            cell: (product) => product.getValue(),
            header: () => <span>Price</span>,
        }),
        columnHelper.accessor("actions", {
            cell: (product) => (
                <>
                    <Switch
                        name="disabled"
                        defaultChecked={product.row.original.disabled}
                        onCheckedChange={async (checked) => {
                            try {
                                const response = await Axios.put(
                                    route("disabled-products.update", {
                                        product: product.row.original,
                                    }),
                                    {
                                        disabled: checked,
                                    }
                                );

                                toast.success(response.message);
                            } catch (err) {
                                dialogRef.current.open({
                                    title: "Error",
                                    description: err.message,
                                });
                            }
                        }}
                    />{" "}
                </>
            ),
            header: () => <div className="flex justify-end mr-2">Actions</div>,
        }),
    ];

    return (
        <>
            <div>
                <Toaster />
                <AlertConfirm ref={dialogRef}></AlertConfirm>
                <DataTable columns={columns} data={products} />
            </div>
        </>
    );
}
