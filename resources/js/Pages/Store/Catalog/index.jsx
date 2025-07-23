import Layout from "@/Pages/Store/components/Layout.jsx";
import HomeProducts from "../components/HomeProducts";
import Reviews from "../components/Reviews";
import productsData from "@/data/products.json";

export default function ({ title }) {
    const products = productsData;

    return (
        <Layout title={title}>
            <div className="flex flex-wrap justify-between items-center gap-4 p-4 mb-6">
                <h1 className="text-gray-900 text-3xl sm:text-4xl font-bold tracking-tight">
                    All Products
                </h1>
            </div>

            <div className="flex flex-wrap gap-3 p-4 mb-6 bg-white rounded-lg shadow-sm">
                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 px-4 transition-colors">
                    <p className="text-sm font-medium">Categories</p>
                    <div
                        className="text-gray-500 hover:text-red-600"
                        data-icon="CaretDown"
                        data-size="20px"
                        data-weight="regular"
                    >
                        <svg
                            fill="currentColor"
                            height="18px"
                            viewBox="0 0 256 256"
                            width="18px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                        </svg>
                    </div>
                </button>
                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 px-4 transition-colors">
                    <p className="text-sm font-medium">Price Range</p>
                    <div
                        className="text-gray-500 hover:text-red-600"
                        data-icon="CaretDown"
                        data-size="20px"
                        data-weight="regular"
                    >
                        <svg
                            fill="currentColor"
                            height="18px"
                            viewBox="0 0 256 256"
                            width="18px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                        </svg>
                    </div>
                </button>
                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 px-4 transition-colors">
                    <p className="text-sm font-medium">Stores</p>
                    <div
                        className="text-gray-500 hover:text-red-600"
                        data-icon="CaretDown"
                        data-size="20px"
                        data-weight="regular"
                    >
                        <svg
                            fill="currentColor"
                            height="18px"
                            viewBox="0 0 256 256"
                            width="18px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                        </svg>
                    </div>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="product-card flex flex-col bg-white rounded-xl shadow-lg overflow-hidden group relative transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
                    >
                        <div className="relative overflow-hidden">
                            <div
                                className="w-full bg-center bg-no-repeat aspect-square bg-cover transition-transform duration-500 group-hover:scale-110"
                                style={{
                                    backgroundImage: `url("${product.image}")`,
                                }}
                            ></div>
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-4 z-1 product-details group-hover:zoom-in-100 flex flex-col flex-grow relative z-1">
                            <h3 className="text-gray-800 text-base font-semibold leading-tight mb-1 truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                                {product.name}
                            </h3>
                            <p className="text-red-600 text-lg font-bold leading-normal mb-2 transition-colors duration-300 group-hover:text-red-700">
                                ${product.price}
                            </p>
                            <p className="text-gray-500 text-xs font-normal leading-normal flex-grow transition-colors duration-300 group-hover:text-gray-600">
                                {product.description}
                            </p>
                        </div>
                        {/* Enhanced Add to Cart Overlay */}
                        <div className="add-to-cart absolute z-2 bottom-0 left-0 right-0 p-4 opacity-0 transform translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                            <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                                <svg
                                    fill="currentColor"
                                    height="16"
                                    viewBox="0 0 256 256"
                                    width="16"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-transform duration-300"
                                >
                                    <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path>
                                </svg>
                                <span className="transition-all duration-300">
                                    Buy Now
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
