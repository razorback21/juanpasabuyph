import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import ProductsTable from "./ProductsTable";
import Pagination from "@/components/Pagination";

export default function Index({ outOfStockProducts, productCount }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Out of Stock
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Out of Stock" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                                    <AlertTriangle size={16} className="text-gray-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-base font-semibold">
                                        Out of Stock Products
                                    </CardTitle>
                                    <p className="mt-0.5 text-xs text-gray-500 font-medium">
                                        {productCount} {productCount === 1 ? "product" : "products"} need restocking
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ProductsTable products={outOfStockProducts.data} />
                            <div className="mt-4">
                                <Pagination links={outOfStockProducts.links} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
