import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProductsTable from "./ProductsTable";

export default function Index({ featuredProducts }) {
    return (
        <AuthenticatedLayout header="Featured Products">
            <Head title="Featured Products" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white">
                    <div className="overflow-hidden px-6 bg-white shadow-sm sm:rounded-lg">
                        <ProductsTable products={featuredProducts} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
