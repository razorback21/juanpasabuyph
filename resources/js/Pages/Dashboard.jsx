import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import DataTable from "@/Components/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import LinkButton from "@/Components/LinkButton";
import Dropdown from "@/Components/Dropdown";
import { useState } from "react";

export default function Dashboard({ products, categories, category_name }) {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("featured_image", {
            cell: (info) => null,
            header: () => <span>Image</span>,
        }),
        columnHelper.accessor("name", {
            cell: (info) => info.getValue(),
            header: () => <span>Name</span>,
        }),
        columnHelper.accessor("description", {
            cell: (info) => info.getValue(),
            header: () => <span>Description</span>,
        }),
        columnHelper.accessor("price", {
            cell: (info) => info.getValue(),
            header: () => <span>Price</span>,
        }),
        columnHelper.accessor("actions", {
            cell: (info) => (
                <div className="flex items-center justify-end gap-2">
                    <LinkButton
                        href={info.row.original.edit_url}
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
            header: () => <span>Actions</span>,
        }),
    ];

    function CategoryFilter({ categories }) {
        const [categoryName, setCategoryName] = useState("All");
        
        return  <Dropdown align="left" width="48">
        <Dropdown.Trigger>
            <button className="p-2 px-4 bg-blue-500 text-white rounded">
                Categories : {category_name}
            </button>
        </Dropdown.Trigger>

        <Dropdown.Content>
            <Dropdown.Link href={route("dashboard")}>
                All
            </Dropdown.Link>
            {categories.map((category) => {
                return (
                    <Dropdown.Link
                        key={category.id}
                        href={
                            route("dashboard") +
                            "?category=" +
                            category.id +
                            "&category_name=" +
                            category.name
                        }
                        onClick={() => {
                            setCategoryName(
                                category.name
                            );
                        }}
                    >
                        {category.name}
                    </Dropdown.Link>
                );
            })}
        </Dropdown.Content>
    </Dropdown>
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white">
                    <div className="overflow-hidden px-6 py-6 bg-white shadow-sm sm:rounded-lg">
                        <div className="flex justify-end mb-2">
                           <CategoryFilter categories={categories} />
                        </div>
                        <div>
                            <DataTable columns={columns} data={products.data} />
                        </div>
                    </div>
                </div>
                <div className="text-gray-900 text-center">
                    <Pagination links={products.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
