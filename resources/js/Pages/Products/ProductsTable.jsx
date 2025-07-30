import { useState, useRef } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import LinkButton from "@/Components/LinkButton";
import Dropdown from "@/Components/Dropdown";
import DataTable from "@/Components/DataTable";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/components/ui/badge";
import AlertConfirm from "@/Components/AlertConfirm";

export default function ({ products, categories, active_category }) {
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
                    <div>
                        {product.getValue()}
                        <p className="mt-1">
                            {product.row.original.disabled ? (
                                <Badge variant="outline">Disabled</Badge>
                            ) : null}
                        </p>
                    </div>
                </Link>
            ),
            header: () => <span>Name</span>,
        }),
        columnHelper.accessor("available_stock", {
            cell: (product) => product.getValue(),
            header: () => <span>Stocks</span>,
        }),
        columnHelper.accessor("product_category", {
            cell: (product) => product.getValue(),
            header: () => <span>Category</span>,
        }),
        columnHelper.accessor("description", {
            cell: (product) => product.getValue(),
            header: () => <div>Description</div>,
            size: 270,
        }),
        columnHelper.accessor("is_featured", {
            cell: (product) =>
                !product.getValue() ? (
                    ""
                ) : (
                    <Badge variant="secondary">Yes</Badge>
                ),
            header: () => <span>Feat. Product</span>,
        }),
        columnHelper.accessor("price", {
            cell: (product) => product.getValue(),
            header: () => <span>Price</span>,
        }),
        columnHelper.accessor("actions", {
            cell: (product) => (
                <div className="flex items-center justify-end gap-2">
                    <LinkButton
                        href={route("products.edit", {
                            product: product.row.original,
                        })}
                    >
                        Edit
                    </LinkButton>
                    <Button
                        onClick={() => {
                            dialogRef.current?.open({
                                title: `${product.row.original.name}`,
                                description: `Are you sure you want to to delete product?`,
                                product,
                                onContinue: () =>
                                    deleteHandler(product.row.original),
                            });
                        }}
                        variant="destructive"
                    >
                        DELETE
                    </Button>
                </div>
            ),
            header: () => <div className="flex justify-end mr-2">Actions</div>,
        }),
    ];

    const deleteHandler = (row) => {
        router.delete(route("products.destroy", row) + window.location.search);
        console.log(dialogRef.current, "FFFFF");
        dialogRef.current?.close();
    };

    function CategoryFilter({ categories }) {
        const [categoryName, setCategoryName] = useState("All");

        return (
            <Dropdown align="left" width="48">
                <Dropdown.Trigger>
                    <span className="mr-2 font-medium">
                        {active_category} :{" "}
                    </span>
                    <Button variant="outline">Categories</Button>
                </Dropdown.Trigger>

                <Dropdown.Content>
                    <Dropdown.Link href={route("dashboard")}>All</Dropdown.Link>
                    {categories.map((category) => {
                        return (
                            <Dropdown.Link
                                key={category.id}
                                href={
                                    route("dashboard") +
                                    "?category=" +
                                    category.id +
                                    "&active_category=" +
                                    category.name
                                }
                                onClick={() => {
                                    setCategoryName(category.name);
                                }}
                            >
                                {category.name}
                            </Dropdown.Link>
                        );
                    })}
                </Dropdown.Content>
            </Dropdown>
        );
    }

    return (
        <>
            <div className="flex justify-end mb-2">
                <CategoryFilter categories={categories} />
                <Link href={route("products.create")}>
                    <Button className="ml-2">+ Add Product</Button>
                </Link>
            </div>
            <div>
                <AlertConfirm ref={dialogRef}></AlertConfirm>
                <DataTable columns={columns} data={products.data} />
            </div>
        </>
    );
}
