import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import LinkButton from "@/Components/LinkButton";
import Textarea from "@/Components/Textarea";
import NoImage from "@/Components/NoImage";

// /import Dropdown from "@/Components/Dropdown";
import { useRef } from "react";
import { Switch } from "@/Components/ui/switch";
import { Label } from "@/Components/ui/label";

export default function EditProduct({ product, categories, from }) {
    const props = usePage().props;
    const formDataRef = useRef({
        name: product.name,
        description: product.description,
        price: product.price,
        product_category_id: product.product_category_id,
    });
    console.log(usePage());
    const submitHandler = (e) => {
        e.preventDefault();
        router.put(route("products.update", product), formDataRef.current);
    };

    const formInputHandler = (e) => {
        formDataRef.current[e.target.name] = e.target.value;
    };

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
                            href={from ?? route("dashboard")}
                            className="mr-2 bg-red-500 text-white"
                        >
                            Back
                        </LinkButton>
                    </div>
                    <div className="flex justify-center pt-10 pb-5">
                        {product.featured_image ? (
                            <img
                                src={product.featured_image}
                                alt={product.name}
                                className="h-[300px] object-cover rounded-md"
                            />
                        ) : (
                            <NoImage />
                        )}
                    </div>
                    <div className="overflow-hidden px-6 py-6 bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submitHandler}>
                            <div className="mb-4">
                                <select
                                    name="product_category_id"
                                    onChange={formInputHandler}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">
                                        -- Select Category --
                                    </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                            selected={
                                                category.id ===
                                                product.product_category_id
                                            }
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {props.errors?.product_category_id && (
                                    <p className="text-red-500 text-sm py-1">
                                        Category field is required
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <InputLabel value="Name" htmlFor="name" />
                                <TextInput
                                    className="w-full mt-1"
                                    defaultValue={product.name}
                                    name="name"
                                    onChange={formInputHandler}
                                />
                                {props.errors?.name && (
                                    <p className="text-red-500 text-sm py-1">
                                        Name field is required
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <InputLabel
                                    value="Description"
                                    htmlFor="description"
                                />
                                <Textarea
                                    className="w-full mt-1"
                                    rows="8"
                                    name="description"
                                    onChange={formInputHandler}
                                >
                                    {product.description}
                                </Textarea>
                                {props.errors?.description && (
                                    <p className="text-red-500 text-sm py-1">
                                        Description field is required
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <div className="flex gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            name="is_featured"
                                            defaultChecked={product.is_featured}
                                            onCheckedChange={(checked) => {
                                                formDataRef.current.is_featured =
                                                    checked;
                                            }}
                                        />{" "}
                                        <Label htmlFor="is_featured">
                                            Set as Featured Product
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            name="disabled"
                                            defaultChecked={product.disabled}
                                            onCheckedChange={(checked) => {
                                                formDataRef.current.disabled =
                                                    checked;
                                            }}
                                        />{" "}
                                        <Label htmlFor="disabled">
                                            Disable Product
                                        </Label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <InputLabel value="Price" htmlFor="price" />
                                <TextInput
                                    className="w-full mt-1"
                                    type="number"
                                    defaultValue={product.price}
                                    name="price"
                                    onChange={formInputHandler}
                                />
                                {props.errors?.price && (
                                    <p className="text-red-500 text-sm py-1">
                                        Price field is required
                                    </p>
                                )}
                            </div>
                        </form>
                        <div className="mt-4">
                            <LinkButton
                                href={from ?? route("dashboard")}
                                className="mr-2 bg-red-500 text-white"
                            >
                                Back
                            </LinkButton>
                            <PrimaryButton
                                type="button"
                                onClick={submitHandler}
                            >
                                Save
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
