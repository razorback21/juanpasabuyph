import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProductsTable from "./ProductsTable";

export default function Index({ disabledProducts }) {
    return (
        <AuthenticatedLayout header="Disabled Products">
            <Head title="Disabled Products" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white">
                    <div className="overflow-hidden px-6 bg-white shadow-sm sm:rounded-lg">
                        <ProductsTable products={disabledProducts} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
