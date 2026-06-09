import { Link } from "@inertiajs/react";

export default function HomeProducts({
    products,
    title,
    description,
    titleTextSize = "text-3xl",
}) {
    return (
        <section className="mb-12">
            <header>
                <h2
                    className={`text-gray-900 ${titleTextSize} font-bold leading-tight tracking-tight px-4 `}
                >
                    {title}
                </h2>
                {description && description !== "undefined" && description.trim() !== "" && (
                    <p className="text-gray-500 px-4 pb-6 pt-2">
                        {description}
                    </p>
                )}
            </header>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/catalog/${product.category?.slug ?? product.category.name}/${product?.slug}`}
                        className="product-card flex flex-col bg-white rounded-xl shadow-lg overflow-hidden group relative transition-shadow duration-300 hover:shadow-2xl cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-white/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10 flex flex-col items-center justify-end p-6">
                            <div className="w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                <div className="text-center mb-4">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-3 shadow-lg shadow-red-500/30">
                                        <svg
                                            className="w-6 h-6 text-white"
                                            fill="none"
                                            height="24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-gray-900 text-lg font-bold leading-tight mb-2 px-2 line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-red-600 text-2xl font-bold mb-5">
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
                                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-base font-semibold py-3.5 px-8 rounded-2xl shadow-xl shadow-red-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/40 active:scale-95"
                                >
                                    <svg
                                        fill="currentColor"
                                        height="18"
                                        viewBox="0 0 256 256"
                                        width="18"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path>
                                    </svg>
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
        </section>
    );
}
