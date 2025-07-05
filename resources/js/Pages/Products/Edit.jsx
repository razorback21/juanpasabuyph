import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Button } from "@/Components/ui/button";
import LinkButton from "@/Components/LinkButton";
import Textarea from "@/Components/Textarea";
import NoImage from "@/Components/NoImage";
import AlertConfirm from "@/Components/AlertConfirm";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Progressbar from "@/Components/ProgressBar";
// /import Dropdown from "@/Components/Dropdown";
import { useRef } from "react";
import { Switch } from "@/Components/ui/switch";
import { Label } from "@/Components/ui/label";

export default function EditProduct({ product, categories, from }) {
    const props = usePage().props;
    const imageDesciptionRef = useRef(null);
    const imageRef = useRef(null);
    const imageFileRef = useRef(null);
    const alertRef = useRef(null);
    const progressBarRef = useRef(null);

    const formDataRef = useRef({
        name: product.name,
        description: product.description,
        price: product.price,
        product_category_id: product.product_category_id,
    });

    const submitHandler = (e) => {
        e.preventDefault();
        router.put(route("products.update", product), formDataRef.current);
    };

    const formInputHandler = (e) => {
        formDataRef.current[e.target.name] = e.target.value;
    };

    const handleImageClick = () => {
        imageFileRef.current.click();
    };

    const handleImageChange = (e) => {
        progressBarRef.current?.show(false);
        imageDesciptionRef.current.firstElementChild.innerHTML =
            e.target.files[0].name;
    };

    const uploadImageHandler = (e) => {
        e.preventDefault();

        const file = imageFileRef.current.files[0];
        if (!file) {
            alertRef.current.open({
                title: "Error",
                description: "Please select an image",
            });
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        router.post(
            "/productimages/upload/" + product.id + "/featured",
            formData,
            {
                forceFormData: true,
                onSuccess: () => {
                    // Clear the file input
                    imageFileRef.current.value = "";
                    imageDesciptionRef.current.firstElementChild.innerHTML = "";

                    toast.success("Image uploaded successfully!");
                },
                onError: (errors) => {
                    alertRef.current.open({
                        title: "Error",
                        description:
                            `Failed to upload image. ${props.errors.image}`,
                    });
                    progressBarRef.current?.show(false);
                    progressBarRef.current?.reset();
                },
                onStart: () => {
                    progressBarRef.current?.reset();
                },
                onProgress: (event) => {
                    console.log(event);
                    progressBarRef.current?.show(true);
                    progressBarRef.current?.setValue(event.percentage || 0);
                },
            }
        );
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
            <AlertConfirm ref={alertRef} />
            <Toaster />
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
                    <div className={`flex flex-col justify-center`}>
                        <div className="flex justify-center pt-10 pb-5">
                            {product.featured_image ? (
                                <img
                                    ref={imageRef}
                                    src={product.featured_image}
                                    alt={product.name}
                                    className="h-[300px] object-cover rounded-md"
                                    onClick={handleImageClick}
                                />
                            ) : (
                                <NoImage onClick={handleImageClick} />
                            )}

                            <input
                                ref={imageFileRef}
                                type="file"
                                name="featured_image"
                                className="hidden"
                                accept=".jpg,.jpeg,.png,.webp"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <Progressbar ref={progressBarRef} />
                            <Button
                                variant="outline"
                                ref={imageDesciptionRef}
                                className="text-center mt-2"
                                onClick={uploadImageHandler}
                            >
                                Upload Image : <span></span>
                            </Button>
                        </div>
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
                                    defaultValue={product.description}
                                ></Textarea>
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
