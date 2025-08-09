import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProductCategoriesTable from "./ProductCategoriesTable";
import Pagination from "@/components/Pagination";

export default function Index({ categories }) {
    return (
        <AuthenticatedLayout header="Categories">
            <Head title="Categories" />
            <div className="flex flex-col px-4 lg:px-6">
                <ProductCategoriesTable categories={categories.data} />
            </div>
            <div className="text-gray-900 text-center">
                <Pagination links={categories.links} />
            </div>
        </AuthenticatedLayout>
    );
}
