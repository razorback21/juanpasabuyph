import Layout from "@/Pages/Store/components/Layout";
import { Badge } from "@/components/ui/badge";
import HomeProducts from "../components/HomeProducts";
import QuantityInput from "../components/QuantityInput";
import CategorySidebar from "../components/CategorySidebar";
import { router, usePage } from "@inertiajs/react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import Lightbox from "../components/Lightbox";

export default function Item({
    title,
    product,
    category,
    categorySlug,
    relatedProducts,
    categories = [],
    priceRange = { min: 0, max: 10000 },
}) {
    const page = usePage();
    const quantityInputRef = useRef(null);
    const lightboxRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const galleryImages = product.gallery_images || [];
    const displayImages = galleryImages.length > 0 ? galleryImages : [
        { id: null, large_url: product.featured_image_url, medium_url: product.featured_image_url, thumb_url: product.featured_image_url }
    ];

    const activeImage = displayImages[activeIndex] || displayImages[0];

    const handlerAddToCart = (e) => {
        e.preventDefault();
        const quantity = quantityInputRef.current.getQuantity();
        router.put(
            route("cart.update"),
            {
                product_id: product.id,
                quantity,
            },
            {
                onSuccess: () => {
                    toast.success("Item added to cart");
                },
            }
        );
    };

    function disabledItem() {
        return product.available_stock === 0 || product.disabled;
    }

    const handleThumbnailClick = (image, index) => {
        setActiveIndex(index);
    };

    const handleMainImageClick = () => {
        console.log('Main image clicked', { lightboxRef: lightboxRef.current, activeIndex });
        if (lightboxRef.current) {
            lightboxRef.current.goTo(activeIndex);
        } else {
            console.error('Lightbox ref is null');
        }
    };

    const lightboxSources = displayImages.map((img) => img.large_url);

    return (
        <Layout title={product.name} category={category}>
            <Toaster />
            <Lightbox
                ref={lightboxRef}
                sources={lightboxSources}
            />
            <div className="mb-6 text-sm text-[#6b7280]">
                Category /{" "}
                <Link
                    href={`/catalog?category=${categorySlug}`}
                    className="hover:text-[#e92933] transition-colors"
                >
                    {category}
                </Link>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <CategorySidebar
                    categories={categories}
                    activeCategorySlug={categorySlug}
                    priceRange={priceRange}
                />
                <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <div
                                onClick={handleMainImageClick}
                                className="aspect-[4/3] w-full rounded-lg overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={activeImage.large_url || activeImage.medium_url}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {displayImages.length > 1 && (
                                <div className="flex gap-2 mt-4 flex-wrap">
                                    {displayImages.map((image, index) => (
                                        <div
                                            key={image.id || index}
                                            onClick={() => handleThumbnailClick(image, index)}
                                            className={`w-16 h-16 rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                                                activeIndex === index
                                                    ? "border-blue-500 opacity-100"
                                                    : "border-transparent opacity-70 hover:opacity-100"
                                            }`}
                                        >
                                            <img
                                                src={image.thumb_url || image.medium_url}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h1 className="text-3xl font-bold text-[#1f2937] mb-2">
                                {product.name}
                            </h1>
                            <p className="text-[#4b5563] text-base leading-relaxed mb-6">
                                {product.description}
                            </p>
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-[#1f2937] mb-1">
                                    Price:
                                </h3>
                                <p className="text-3xl font-bold text-[#e92933]">
                                    ₱
                                    {parseFloat(product.price).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                    })}
                                </p>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-sm text-[#1f2937] mb-1">
                                    Sold per {product.sale_uom}
                                </h3>
                                {!product.available_stock && (
                                    <Badge variant="destructive">Out of Stock</Badge>
                                )}
                            </div>
                            {disabledItem() ? null : (
                                <div>
                                    <div className="mb-6">
                                        <QuantityInput
                                            ref={quantityInputRef}
                                            disabled={disabledItem()}
                                        />
                                    </div>
                                    {page.props.errors.quantity && (
                                        <p className="text-sm my-2">
                                            {page.props.errors.quantity}
                                        </p>
                                    )}
                                    <Button
                                        disabled={disabledItem()}
                                        onClick={handlerAddToCart}
                                        className="w-full flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-[#e92933] text-white text-base font-semibold transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#e92933] focus:ring-opacity-50 hover:bg-[#ce2b30]"
                                    >
                                        <span className="add-to-cart-text">
                                            Add to Cart
                                        </span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {relatedProducts.length > 0 && (
                <div className="mt-12">
                    <HomeProducts
                        products={relatedProducts}
                        title="Related Products"
                        titleTextSize="text-2xl"
                    />
                </div>
            )}
        </Layout>
    );
}
