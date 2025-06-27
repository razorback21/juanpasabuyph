//import { DataTable } from "@/components/data-table"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ProductsTable } from "./ProductsTable.jsx.TanStack";

export default function (props) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex flex-col px-4 lg:px-6">
                <ProductsTable
                   {...props}
                />
            </div>
        </AuthenticatedLayout>
    );
}
