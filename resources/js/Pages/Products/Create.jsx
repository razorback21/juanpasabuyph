import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import TextInput from "@/components/TextInput";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import LinkButton from "@/components/LinkButton";
import Textarea from "@/components/Textarea";
import ItemPrice from "./ItemPrice";
// /import Dropdown from "@/components/Dropdown";
import { useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Create({ categories, uoms }) {
    const props = usePage().props;
    const formDataRef = useRef({
        name: "",
        description: "",
        price: 0,
        product_category_id: null,
        cost_price: 0,
        sale_uom: "pc",
    });

    const submitHandler = (e) => {
        e.preventDefault();

        router.post(route("products.store"), formDataRef.current);
    };

    const formInputHandler = (e) => {
        formDataRef.current[e.target.name] = e.target.value;
    };

    // function ItemPrice() {
    //     const [costPrice, setCostPrice] = useState(0.0);
    //     const [salePrice, setSalePrice] = useState(0.0);
    //     return (
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    //             <div>
    //                 <InputLabel value="Cost Price" htmlFor="cost_price" />
    //                 <TextInput
    //                     className="w-full mt-1"
    //                     type="number"
    //                     name="cost_price"
    //                     onChange={(e) => {
    //                         setSalePrice(e.target.value); // Auto-update sale price
    //                         formInputHandler(e);
    //                         formDataRef.current.price = e.target.value;
    //                     }}
    //                     defaultValue={costPrice}
    //                 />
    //                 {props.errors?.cost_price && (
    //                     <p className="text-red-500 text-sm py-1">
    //                         Cost Price field is required
    //                     </p>
    //                 )}
    //             </div>
    //             <div>
    //                 <InputLabel value="Sale Price" htmlFor="price" />
    //                 <TextInput
    //                     className="w-full mt-1"
    //                     type="number"
    //                     name="price"
    //                     onChange={(e) => {
    //                         setSalePrice(e.target.value); // Allow custom input
    //                         formInputHandler(e);
    //                     }}
    //                     value={salePrice}
    //                 />
    //                 {props.errors?.price && (
    //                     <p className="text-red-500 text-sm py-1">
    //                         Sale Price field is required
    //                     </p>
    //                 )}
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    New Product
                </h2>
            }
        >
            <Head title={`New Product`} />

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
                    {/* <div className="flex justify-center pt-10 pb-5">
                        <img
                            src={product.featured_image}
                            alt={product.name}
                            className="h-[300px] object-cover rounded-md"
                        />
                    </div> */}
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
                                            value={category.id}
                                            key={category.id}
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
                                ></Textarea>
                                {props.errors?.description && (
                                    <p className="text-red-500 text-sm py-1">
                                        Description field is required
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="sale_uom">Sold per</Label>
                                <br />
                                <select
                                    name="sale_uom"
                                    onChange={formInputHandler}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">
                                        -- Select Sale UoM --
                                    </option>
                                    {Object.entries(uoms).map(([key, uom]) => (
                                        <option key={key} value={key}>
                                            {uom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        name="is_featured"
                                        defaultChecked={false}
                                        onCheckedChange={(checked) => {
                                            formDataRef.current.is_featured =
                                                checked;
                                        }}
                                    />{" "}
                                    <Label htmlFor="is_featured">
                                        Set as Featured Product
                                    </Label>
                                </div>
                            </div>
                            <ItemPrice ref={formDataRef} />
                        </form>
                        <div className="mt-4">
                            <LinkButton
                                href={route("dashboard")}
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
