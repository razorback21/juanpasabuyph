import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import LinkButton from "@/Components/LinkButton";
import NoImage from "@/Components/NoImage";
import InventoryTable from "@/Pages/Products/InventoryTable";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/Components/ui/button";

export default function EditProduct({ product }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {product.name}
                </h2>
            }
        >
            <Head title={`Edit - ${product.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-right pt-4">
                        <LinkButton
                            href={route("dashboard")}
                            className="mr-2 bg-red-500 text-white"
                        >
                            Back
                        </LinkButton>
                    </div>
                    <div className="flex pt-10 pb-5 gap-10">
                        {product.featured_image ? (
                            <img
                                src={product.featured_image_url}
                                alt={product.name}
                                className="h-[300px] max-w-[300px] object-cover rounded-md"
                            />
                        ) : (
                            <NoImage height="300px" width="300px" />
                        )}

                        <div>
                            <h1 className="text-2xl font-bold">
                                {product.name}
                            </h1>
                            <p>Price: PHP {product.price}</p>
                            <p class="my-4">{product.description}</p>
                            <p class="my-4">
                                Stocks: {product.current_stock ?? "0"} pcs.
                            </p>
                            <p>
                                <LinkButton
                                    href={
                                        route("products.edit", product) +
                                        "?from=/products/" +
                                        product.id
                                    }
                                >
                                    Edit
                                </LinkButton>
                            </p>
                        </div>
                    </div>
                </div>

                <Separator />
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold my-5">Inventory</h1>
                        <Button>+ Add Inventory</Button>
                    </div>
                    { product.disabled ? (
                        <p className="text-sm">
                            This product is disabled. You cannot add inventory.
                        </p>
                    ) : (
                        <InventoryTable inventory={product.inventory} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
