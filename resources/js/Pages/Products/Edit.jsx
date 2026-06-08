import { useRef, useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TextInput from "@/components/TextInput";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/Textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    Save,
    ImageIcon,
    Star,
    EyeOff,
    Upload,
    Trash2,
    CheckCircle2,
    Loader2,
    ImagePlus,
} from "lucide-react";
import ItemPrice from "./ItemPrice";

export default function Edit({ product, categories, from, uoms }) {
    const props = usePage().props;
    const galleryFileRef = useRef(null);
    const [uploading, setUploading] = useState(false);

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

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        if (!files || files.length === 0) return;

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("images[]", file);
        });

        setUploading(true);

        router.post(
            route("productimages.upload-gallery", product.slug),
            formData,
            {
                forceFormData: true,
                onSuccess: () => {
                    galleryFileRef.current.value = "";
                    router.reload({ only: ["product"] });
                    toast.success("Gallery images uploaded!");
                },
                onError: () => {
                    setUploading(false);
                    toast.error("Failed to upload gallery images.");
                },
                onFinish: () => {
                    setUploading(false);
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
                    toast.success("Image deleted!");
                },
                onError: () => {
                    toast.error("Failed to delete image.");
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
                    toast.error("Failed to set featured image.");
                },
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href={from ?? route("products.index")}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                        >
                            <ArrowLeft size={16} />
                        </Link>
                        <div>
                            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                Edit Product
                            </h2>
                        </div>
                    </div>
                    <PrimaryButton
                        type="button"
                        onClick={submitHandler}
                        className="gap-2"
                    >
                        <Save size={14} />
                        Save Changes
                    </PrimaryButton>
                </div>
            }
        >
            <Head title={`Edit - ${product.name}`} />
            <Toaster />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

                        {/* LEFT — Form (3/5) */}
                        <div className="space-y-6 lg:col-span-3">
                            <Card>
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                                            <Star size={16} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base font-semibold">
                                                Product Information
                                            </CardTitle>
                                            <p className="mt-0.5 text-xs text-gray-500">
                                                Name, description, category, and pricing
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={submitHandler} id="edit-product-form">
                                        <div className="space-y-4">
                                            <div>
                                                <InputLabel value="Category" htmlFor="product_category_id" />
                                                <select
                                                    name="product_category_id"
                                                    onChange={formInputHandler}
                                                    className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                >
                                                    <option value="">-- Select Category --</option>
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
                                                    <p className="mt-1 text-xs text-red-500">
                                                        Category field is required
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <InputLabel value="Name" htmlFor="name" />
                                                <TextInput
                                                    className="mt-1 w-full"
                                                    defaultValue={product.name}
                                                    name="name"
                                                    onChange={formInputHandler}
                                                />
                                                {props.errors?.name && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        Name field is required
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <InputLabel value="Description" htmlFor="description" />
                                                <Textarea
                                                    className="mt-1 w-full"
                                                    rows={6}
                                                    name="description"
                                                    onChange={formInputHandler}
                                                    defaultValue={product.description}
                                                />
                                                {props.errors?.description && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        Description field is required
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="sale_uom">Sold per</Label>
                                                <select
                                                    name="sale_uom"
                                                    onChange={formInputHandler}
                                                    className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                >
                                                    <option value="">-- Select UoM --</option>
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

                                            <Separator />

                                            <div>
                                                <ItemPrice
                                                    ref={formDataRef}
                                                    cost={product.cost_price}
                                                    price={product.price}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* RIGHT — Toggles + Gallery (2/5) */}
                        <div className="space-y-6 lg:col-span-2">
                            <Card>
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                                            <EyeOff size={16} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base font-semibold">
                                                Product Status
                                            </CardTitle>
                                            <p className="mt-0.5 text-xs text-gray-500">
                                                Visibility and featured settings
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <Star size={16} className="text-amber-500" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Featured Product
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Show on homepage
                                                </p>
                                            </div>
                                        </div>
                                        <Switch
                                            name="is_featured"
                                            defaultChecked={product.is_featured}
                                            onCheckedChange={(checked) => {
                                                formDataRef.current.is_featured = checked;
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <EyeOff size={16} className="text-gray-500" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Disabled
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Hide from storefront
                                                </p>
                                            </div>
                                        </div>
                                        <Switch
                                            name="disabled"
                                            defaultChecked={product.disabled}
                                            onCheckedChange={(checked) => {
                                                formDataRef.current.disabled = checked;
                                            }}
                                        />
                                    </div>
                                    {product.disabled === true && (
                                        <Badge variant="secondary" className="self-start">
                                            Product is currently disabled
                                        </Badge>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                                            <ImageIcon size={16} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base font-semibold">
                                                Gallery
                                            </CardTitle>
                                            <p className="mt-0.5 text-xs text-gray-500">
                                                Product images
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <button
                                        type="button"
                                        disabled={uploading}
                                        onClick={() => !uploading && galleryFileRef.current.click()}
                                        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 px-4 py-6 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-wait disabled:border-blue-300 disabled:bg-blue-50 disabled:text-blue-600"
                                    >
                                        {uploading ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <ImagePlus size={16} />
                                                Upload Images
                                            </>
                                        )}
                                    </button>
                                    <input
                                        ref={galleryFileRef}
                                        type="file"
                                        name="gallery_images"
                                        className="hidden"
                                        accept=".jpg,.jpeg,.png,.webp"
                                        multiple
                                        onChange={handleGalleryChange}
                                    />

                                    {(product.gallery_images || []).length > 0 ? (
                                        <div className="grid grid-cols-3 gap-2">
                                            {(product.gallery_images || []).map((image) => (
                                                <div
                                                    key={image.id}
                                                    className="group relative aspect-square overflow-hidden rounded-lg border border-gray-100"
                                                >
                                                    <img
                                                        src={image.medium_url}
                                                        alt="Gallery"
                                                        className="h-full w-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleSetFeatured(image.id)}
                                                            className={`flex h-7 w-7 items-center justify-center rounded-md text-xs ${
                                                                product.featured_media_id === image.id
                                                                    ? "bg-blue-500 text-white"
                                                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                                            }`}
                                                            title="Set as featured"
                                                        >
                                                            <CheckCircle2 size={14} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteImage(image.id)}
                                                            className="flex h-7 w-7 items-center justify-center rounded-md bg-red-500 text-white text-xs hover:bg-red-600"
                                                            title="Delete image"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    {product.featured_media_id === image.id && (
                                                        <Badge className="absolute top-1 left-1 px-1.5 py-0 text-[10px]">
                                                            Featured
                                                        </Badge>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 py-8">
                                            <ImageIcon size={20} className="text-gray-300" />
                                            <p className="mt-2 text-xs text-gray-400">
                                                No gallery images yet
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
