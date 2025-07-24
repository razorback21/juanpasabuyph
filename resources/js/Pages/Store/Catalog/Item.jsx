import Layout from "@/Pages/Store/components/Layout";
import { Badge } from "@/components/ui/Badge";
import HomeProducts from "../components/HomeProducts";

export default function ({ title, product, category, relatedProducts }) {
    console.log(relatedProducts);

    return (
        <Layout title={title} category={category}>
            <div className="mb-6 text-sm text-[#6b7280]">
                <a className="hover:text-[#e92933] transition-colors" href="#">
                    {category}
                </a>
                {/* <span class="mx-1">/</span>
                <span class="text-[#1f2937] font-medium">{product.name}</span> */}
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
                            ₱{product.price}
                        </p>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-sm text-[#1f2937] mb-1">
                            Sold per PC.
                        </h3>
                        {!product.current_stock && (
                            <Badge variant="destructive">Out of Stock</Badge>
                        )}
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-[#1f2937] mb-2">
                            Quantity:
                        </h3>
                        <div className="flex items-center">
                            <button className="flex items-center justify-center h-10 w-10 rounded-l-md border border-r-0 border-[#d1d5db] text-[#4b5563] hover:bg-[#f3f4f6] transition-colors">
                                -
                            </button>
                            <input
                                className="form-input h-10 w-16 text-center border-y border-x-0 border-[#d1d5db] text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#e92933] focus:border-[#e92933]"
                                type="number"
                                defaultValue="1"
                            />
                            <button className="flex items-center justify-center h-10 w-10 rounded-r-md border border-l-0 border-[#d1d5db] text-[#4b5563] hover:bg-[#f3f4f6] transition-colors">
                                +
                            </button>
                        </div>
                    </div>
                    <button className="add-to-cart-button w-full flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-[#e92933] text-white text-base font-semibold hover:bg-red-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#e92933] focus:ring-opacity-50">
                        <svg
                            fill="currentColor"
                            height="20px"
                            viewBox="0 0 256 256"
                            width="20px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path>
                        </svg>
                        <span className="add-to-cart-text">Add to Cart</span>
                        <span className="add-to-cart-text-hover">Added!</span>
                    </button>
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
