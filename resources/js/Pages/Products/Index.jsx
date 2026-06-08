import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Package } from "lucide-react";
import ProductsTable from "./ProductsTable";
import Pagination from "@/components/Pagination";

export default function Index(props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Products
                        </h2>
                    </div>
                    <Link href={route("products.create")}>
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90"
                        >
                            <Plus size={14} />
                            Add Product
                        </button>
                    </Link>
                </div>
            }
        >
            <Head title="Products" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="pb-4">
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                                        <Package size={16} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-semibold">
                                            All Products
                                        </CardTitle>
                                        <p className="mt-0.5 text-xs text-gray-500">
                                            {props.active_category !== "All" && `${props.active_category}: `}
                                            Manage your product catalog
                                        </p>
                                    </div>
                                </div>
                                <ProductsTable.FilterButton
                                    categories={props.categories}
                                    activeCategory={props.active_category}
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ProductsTable {...props} />
                            <div className="mt-4">
                                <Pagination links={props.products.links} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
