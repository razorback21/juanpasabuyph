//import { DataTable } from "@/components/data-table"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ProductsTable } from "./ProductsTable";

export default function ({ products, categories, active_category }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex flex-col px-4 lg:px-6">
                <ProductsTable
                    products={products}
                    categories={categories}
                    active_category={active_category}
                />
            </div>
        </AuthenticatedLayout>
    );
}
