import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import DataTable from "@/Components/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import LinkButton from "@/Components/LinkButton";

export default function Dashboard({ products }) {
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
                    <div className="overflow-hidden px-6 py-10 bg-white shadow-sm sm:rounded-lg">
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
