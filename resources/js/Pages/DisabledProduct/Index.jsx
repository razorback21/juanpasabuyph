import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeOff } from "lucide-react";
import ProductsTable from "./ProductsTable";

export default function Index({ disabledProducts }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Disabled Products
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Disabled Products" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                                    <EyeOff size={16} className="text-gray-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-base font-semibold">
                                        Disabled Products
                                    </CardTitle>
                                    <p className="mt-0.5 text-xs text-gray-500">
                                        Hidden from storefront
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ProductsTable products={disabledProducts} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
