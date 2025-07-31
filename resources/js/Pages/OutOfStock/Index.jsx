import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProductsTable from "./ProductsTable";
import Pagination from "@/components/pagination";

export default function ({ outOfStockProducts }) {
    return (
        <AuthenticatedLayout header="Out of Stock Products">
            <Head title="Out of Stock Products" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white">
                    <div className="overflow-hidden px-6 bg-white shadow-sm sm:rounded-lg">
                        <ProductsTable products={outOfStockProducts.data} />
                    </div>
                    <div className="text-gray-900 text-center">
                        <Pagination links={outOfStockProducts.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
