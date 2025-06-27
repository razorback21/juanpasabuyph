import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import LinkButton from "@/Components/LinkButton";
import Textarea from "@/Components/Textarea";

// /import Dropdown from "@/Components/Dropdown";
import { useRef } from "react";
import NoImage from "@/Components/NoImage";

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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white">
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
                                src={product.featured_image}
                                alt={product.name}
                                className="h-[300px] object-cover rounded-md"
                            />
                        ) : (
                            <NoImage />
                        )}

                        <div class="">
                            <h1 className="text-2xl font-bold">
                                {product.name}
                            </h1>
                            <p>Price: PHP {product.price}</p>
                            <p class="my-4">{product.description}</p>
                            <p class="my-4">Stocks: 100 pcs.</p>
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
            </div>
        </AuthenticatedLayout>
    );
}
