//import { DataTable } from "@/components/data-table"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProductsTable from "./ProductsTable";
import Pagination from "@/components/Pagination";

export default function (props) {
    return (
        <AuthenticatedLayout header="Products">
            <Head title="Dashboard" />
            <div className="flex flex-col px-4 lg:px-6">
                <ProductsTable {...props} />
            </div>
            <div className="text-gray-900 text-center">
                <Pagination links={props.products.links} />
            </div>
        </AuthenticatedLayout>
    );
}
