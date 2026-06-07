import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import TextInput from "@/components/TextInput";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import { Button } from "@/components/ui/button";
import LinkButton from "@/components/LinkButton";
import Textarea from "@/components/Textarea";
import NoImage from "@/components/NoImage";
import AlertConfirm from "@/components/AlertConfirm";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Progressbar from "@/components/ProgressBar";
import { useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ItemPrice from "./ItemPrice";

export default function Edit({ product, categories, from, uoms }) {
    const props = usePage().props;
    const imageDesciptionRef = useRef(null);
    const imageRef = useRef(null);
    const imageFileRef = useRef(null);
    const alertRef = useRef(null);
    const progressBarRef = useRef(null);

    const galleryFileRef = useRef(null);
    const galleryDescriptionRef = useRef(null);
    const galleryProgressBarRef = useRef(null);

    const formDataRef = useRef({
        name: product.name,
        description: product.description,
        price: product.price,
        product_category_id: product.product_category_id,
        cost_price: product.cost_price,
        sale_uom: product.sale_uom,
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
                    imageFileRef.current.value = "";
                    imageDesciptionRef.current.firstElementChild.innerHTML = "";
                    router.reload({ only: ["product"] });
                    toast.success("Image uploaded successfully!");
                },
                onError: (errors) => {
                    alertRef.current.open({
                        title: "Error",
                        description: `Failed to upload image. ${props.errors.image}`,
                    });
                    progressBarRef.current?.show(false);
                    progressBarRef.current?.reset();
                },
                onStart: () => {
                    progressBarRef.current?.reset();
                },
                onProgress: (event) => {
                    progressBarRef.current?.show(true);
                    progressBarRef.current?.setValue(event.percentage || 0);
                },
            }
        );
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        galleryDescriptionRef.current.firstElementChild.textContent =
            files.map((f) => f.name).join(", ");
    };

    const uploadGalleryHandler = (e) => {
        e.preventDefault();

        const files = galleryFileRef.current.files;
        if (!files || files.length === 0) {
            alertRef.current.open({
                title: "Error",
                description: "Please select at least one image",
            });
            return;
        }

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("images[]", file);
        });

        router.post(
            route("productimages.upload-gallery", product.slug),
            formData,
            {
                forceFormData: true,
                onSuccess: () => {
                    galleryFileRef.current.value = "";
                    galleryDescriptionRef.current.firstElementChild.textContent = "";
                    galleryProgressBarRef.current?.reset();
                    router.reload({ only: ["product"] });
                    toast.success("Gallery images uploaded!");
                },
                onError: (errors) => {
                    alertRef.current.open({
                        title: "Error",
                        description: `Failed to upload gallery images. ${props.errors.images || ""}`,
                    });
                    galleryProgressBarRef.current?.show(false);
                    galleryProgressBarRef.current?.reset();
                },
                onStart: () => {
                    galleryProgressBarRef.current?.reset();
                },
                onProgress: (event) => {
                    galleryProgressBarRef.current?.show(true);
                    galleryProgressBarRef.current?.setValue(event.percentage || 0);
                },
            }
        );
    };

    const handleDeleteImage = (mediaId) => {
        if (!confirm("Delete this image?")) return;

        router.delete(
            route("productimages.delete", {
                product: product.slug,
                mediaId,
            }),
            {
                onSuccess: () => {
                    router.reload({ only: ["product"] });
                    toast.success("Image deleted successfully!");
                },
                onError: () => {
                    alertRef.current.open({
                        title: "Error",
                        description: "Failed to delete image.",
                    });
                },
            }
        );
    };

    const handleSetFeatured = (mediaId) => {
        router.put(
            route("productimages.set-featured", {
                product: product.slug,
                mediaId,
            }),
            {},
            {
                onSuccess: () => {
                    router.reload({ only: ["product"] });
                    toast.success("Featured image updated!");
                },
                onError: () => {
                    alertRef.current.open({
                        title: "Error",
                        description: "Failed to set featured image.",
                    });
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
                            href={from ?? route("products.index")}
                            className="mr-2 bg-red-500 text-white"
                        >
                            Back
                        </LinkButton>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 pt-8 pb-6 px-6">
                        <div className="flex flex-col items-center sm:w-1/4 shrink-0">
                            <p className="text-sm font-medium text-gray-700 mb-2">Featured Image</p>
                            <div
                                className="w-full max-w-[180px] aspect-square border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-indigo-400 transition-colors flex items-center justify-center"
                                onClick={handleImageClick}
                            >
                                {product.featured_image_url ? (
                                    <img
                                        ref={imageRef}
                                        src={product.featured_image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <NoImage
                                        hoverText="Click to Upload"
                                        onClick={handleImageClick}
                                    />
                                )}
                            </div>

                            <input
                                ref={imageFileRef}
                                type="file"
                                name="featured_image"
                                className="hidden"
                                accept=".jpg,.jpeg,.png,.webp"
                                onChange={handleImageChange}
                            />
                            <Progressbar ref={progressBarRef} />
                            <Button
                                variant="outline"
                                ref={imageDesciptionRef}
                                className="text-center mt-2 text-xs"
                                onClick={uploadImageHandler}
                            >
                                Upload Image : <span></span>
                            </Button>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Gallery Images</h3>
                            <div className="flex items-center gap-4 mb-3">
                                <input
                                    ref={galleryFileRef}
                                    type="file"
                                    name="gallery_images"
                                    className="hidden"
                                    accept=".jpg,.jpeg,.png,.webp"
                                    multiple
                                    onChange={handleGalleryChange}
                                />
                                <Progressbar ref={galleryProgressBarRef} />
                                <Button
                                    variant="outline"
                                    ref={galleryDescriptionRef}
                                    className="text-center text-xs"
                                    onClick={uploadGalleryHandler}
                                >
                                    Upload Gallery Images : <span></span>
                                </Button>
                            </div>
                            {(product.gallery_images || []).length > 0 ? (
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {(product.gallery_images || []).map((image) => (
                                        <div
                                            key={image.id}
                                            className="relative group border rounded-md overflow-hidden"
                                        >
                                            <img
                                                src={image.medium_url}
                                                alt="Product gallery"
                                                className="w-full h-24 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleSetFeatured(image.id)}
                                                    className={`px-2 py-1 text-xs rounded ${
                                                        product.featured_media_id === image.id
                                                            ? "bg-blue-500 text-white"
                                                            : "bg-white text-gray-800"
                                                    }`}
                                                >
                                                    ★
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteImage(image.id)}
                                                    className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            {product.featured_media_id === image.id && (
                                                <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                                                    Featured
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No gallery images yet. Upload images using the button above.
                                </p>
                            )}
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
                                        <option
                                            key={key}
                                            value={key}
                                            selected={key === product.sale_uom}
                                        >
                                            {uom}
                                        </option>
                                    ))}
                                </select>
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
                            <ItemPrice
                                ref={formDataRef}
                                cost={product.cost_price}
                                price={product.price}
                            />
                        </form>
                        <div className="mt-4">
                            <LinkButton
                                href={from ?? route("products.index")}
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
