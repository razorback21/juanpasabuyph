import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProductsTable from "./ProductsTable";
import Pagination from "@/components/pagination";

export default function ({ outOfStockProducts, productCount }) {
    return (
        <AuthenticatedLayout header="Out of Stock">
            <Head title="Out of Stock" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white">
                    <div className="overflow-hidden px-6 bg-white shadow-sm sm:rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <div className="font-bold ">
                                {productCount}{" "}
                                {productCount > 1 ? "products" : "product"} is
                                currently out of stock
                            </div>
                        </div>
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
