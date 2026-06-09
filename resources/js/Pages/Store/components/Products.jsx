import { Link } from "@inertiajs/react";

export default function Products({ products }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 p-3 sm:p-4">
            {products.map((product) => (
                <Link
                    key={product.id}
                    href={`/catalog/${product?.category?.slug ?? product.category.name}/${product?.slug}`}
                    className="product-card flex flex-col bg-white rounded-xl shadow-lg overflow-hidden group relative transition-shadow duration-300 hover:shadow-2xl cursor-pointer"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-white/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10 flex flex-col items-center justify-center p-3">
                        <div className="w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                            <div className="text-center mb-2">
                                <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-1.5 shadow-md shadow-red-500/20">
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="none"
                                        height="16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        width="16"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="text-gray-900 text-sm font-bold leading-tight mb-1 px-1 line-clamp-2">
                                    {product.name}
                                </h3>
                                <p className="text-red-600 text-base font-bold mb-2">
                                    ₱
                                    {parseFloat(product.price).toLocaleString(
                                        "en-US",
                                        { minimumFractionDigits: 2 },
                                    )}
                                </p>
                            </div>
                            <Link
                                href={route("cart.update")}
                                method="put"
                                data={{ product_id: product.id, quantity: 1 }}
                                as="button"
                                className="w-full flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-xs font-semibold py-2 px-4 rounded-xl shadow-lg shadow-red-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/30 active:scale-95"
                            >
                                <span>Add to Cart</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div
                            className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover"
                            style={{
                                backgroundImage: `url("${product.medium_image_url}")`,
                            }}
                        ></div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-gray-800 text-base font-semibold leading-tight mb-1 truncate">
                            {product.name}
                        </h3>
                        <p className="text-red-600 text-lg font-bold leading-normal mb-2">
                            ₱
                            {parseFloat(product.price).toLocaleString(
                                "en-US",
                                { minimumFractionDigits: 2 },
                            )}
                        </p>
                        <p className="text-gray-500 text-xs font-normal leading-normal flex-grow">
                            {product?.description
                                ? product.description.slice(0, 80) + "..."
                                : ""}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
