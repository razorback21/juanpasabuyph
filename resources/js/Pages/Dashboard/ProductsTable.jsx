import { createColumnHelper } from "@tanstack/react-table";
import LinkButton from "@/Components/LinkButton";
import Dropdown from "@/Components/Dropdown";
import { useState } from "react";
import DataTable from "@/Components/DataTable";

export default function ({ products, categories, active_category }) {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("featured_image", {
            cell: (info) => (
                <img
                    src={info.getValue()}
                    alt={info.getValue()}
                    className="w-12 h-12 rounded-[10px]"
                />
            ),
            header: () => <span>Image</span>,
        }),
        columnHelper.accessor("name", {
            cell: (info) => info.getValue(),
            header: () => <span>Name</span>,
        }),
        columnHelper.accessor("product_category", {
            cell: (info) => info.getValue(),
            header: () => <span>Category</span>,
        }),
        columnHelper.accessor("description", {
            cell: (info) => info.getValue(),
            header: () => <div>Description</div>,
            size: 270,
        }),
        columnHelper.accessor("price", {
            cell: (info) => info.getValue(),
            header: () => <span>Price</span>,
        }),
        columnHelper.accessor("actions", {
            cell: (product) => (
                <div className="flex items-center justify-end gap-2">
                    <LinkButton
                        href={route("products.edit", {
                            product: product.row.original,
                        })}
                        className="text-indigo-600 hover:text-indigo-900"
                    >
                        Edit
                    </LinkButton>
                    <LinkButton
                        type="button"
                        className="bg-red-500 hover:bg-red-600"
                    >
                        Delete
                    </LinkButton>
                </div>
            ),
            header: () => <div className="flex justify-end mr-2">Actions</div>,
        }),
    ];

    function CategoryFilter({ categories }) {
        const [categoryName, setCategoryName] = useState("All");

        return (
            <Dropdown align="left" width="48">
                <Dropdown.Trigger>
                    <button className="p-1 px-4 bg-blue-500 text-white rounded">
                        Categories : {active_category}
                    </button>
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
            </div>
            <div>
                <DataTable columns={columns} data={products.data} />
            </div>
        </>
    );
}
