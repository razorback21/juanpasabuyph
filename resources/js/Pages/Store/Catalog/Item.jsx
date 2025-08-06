import Layout from "@/Pages/Store/components/Layout";
import { Badge } from "@/components/ui/badge";
import HomeProducts from "../components/HomeProducts";
import QuantityInput from "../components/QuantityInput";
import { router, usePage } from "@inertiajs/react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

export default function ({ title, product, category, relatedProducts }) {
    const page = usePage();
    const quantityInputRef = useRef(null);

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
                onSuccess: (response) => {
                    toast.success("Item added to cart");
                },
            }
        );
    };

    function disabledItem() {
        return product.available_stock === 0 || product.disabled;
    }

    return (
        <Layout title={product.name} category={category}>
            <Toaster />
            <div className="mb-6 text-sm text-[#6b7280]">
                Category /{" "}
                <Link
                    href={`/catalog?category=${category}`}
                    className="hover:text-[#e92933] transition-colors"
                >
                    {category}
                </Link>
                {/* <span className="mx-1">/</span>
                <span className="text-[#1f2937] font-medium">{product.name}</span> */}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div
                        className="aspect-[4/3] w-full bg-center bg-no-repeat bg-cover rounded-lg overflow-hidden"
                        style={{
                            backgroundImage: `url("${product.featured_image_url}")`,
                        }}
                    ></div>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold text-[#1f2937] mb-2">
                        {product.name}
                    </h1>
                    <p className="text-[#4b5563] text-base leading-relaxed mb-6">
                        {product.description}
                    </p>
                    {/* <div className="mb-6">
                        <h3 className="text-sm font-semibold text-[#1f2937] mb-2">
                            Sold by:
                        </h3>
                        <a className="flex items-center gap-3 group" href="#">
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10 border border-[#e5e7eb]"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIAAMDUCF-FxIgmud6jvtDs0YELtxWr6YDeXy7E5KDrmzY0WTqjwIbhDnJa45fouylrkjQF_Vx8-aDD3TSF4WZhBLzWXrvM6WCCpLyVqBQuVVvZz7OlwaAD3IFGwm3hNomPsqdVhiZssc8oS2NKSe1FPC7ZmVg6VLRd2e3JSU6UPa_m2bZB-8qendRNVyJQCDnFdRIS4LgPg38Kle8xOsC4hY-2jOPefG8LklQPV_ymf5ZOw2hv4wYjn620eTTrJZ_KB7jJYxrwH0y")',
                                }}
                            ></div>
                            <p className="text-[#e92933] text-base font-semibold group-hover:underline">
                                Urban Threads
                            </p>
                        </a>
                    </div> */}
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
                                {/* <svg
                            fill="currentColor"
                            height="20px"
                            viewBox="0 0 256 256"
                            width="20px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path>
                        </svg> */}
                                <span className="add-to-cart-text">
                                    Add to Cart
                                </span>
                                {/* <span className="add-to-cart-text-hover">Added!</span> */}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-12">
                <HomeProducts
                    products={relatedProducts}
                    title="Related Products"
                    titleTextSize="text-2xl"
                />
            </div>
        </Layout>
    );
}
