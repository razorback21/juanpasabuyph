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
                        <div className="relative overflow-hidden">
                            <div
                                className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover"
                                style={{
                                    backgroundImage: `url("${product.medium_image_url}")`,
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
<<<<<<< ours
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
                                <h3 className="text-white text-base font-semibold leading-tight mb-1 text-center px-3 line-clamp-2">
                                    {product.name}
                                </h3>
                                <p className="text-red-400 text-lg font-bold mb-4">
                                    ₱
                                    {parseFloat(product.price).toLocaleString(
                                        "en-US",
                                        { minimumFractionDigits: 2 },
                                    )}
                                </p>
=======
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
>>>>>>> theirs
                                <button
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200 active:scale-95"
                                    href={{
                                        route: "store.cart.add",
                                        params: { id: product.id },
                                    }}
                                    method="post"
                                >
                                    <svg
                                        fill="currentColor"
                                        height="16"
                                        viewBox="0 0 256 256"
                                        width="16"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path>
                                    </svg>
                                    <span>Buy Now</span>
                                </button>
                            </div>
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
