import Layout from "@/Pages/Store/components/Layout.jsx";
import HomeProducts from "../components/HomeProducts";
import Reviews from "../components/Reviews";
import { Link } from "@inertiajs/react";

export default function ({ title, featuredProducts, popularProducts }) {
    return (
        <Layout title={title}>
            {/* Hero Section - Main Value Proposition */}
            <section className="w-full @container mb-12" role="banner">
                <div
                    className="bg-contain bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[400px] sm:min-h-[500px] shadow-lg"
                    style={{
                        backgroundImage:
                            'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 40%), url("/storage/assets/pdala_hero_bg.png")',
                    }}
                >
                    <div className="p-8 sm:p-12">
                        <h1 className="text-white text-3xl sm:text-5xl font-bold leading-tight tracking-tight max-w-2xl">
                            Discover Authentic Dubai Products - Delivered to
                            Philippines
                        </h1>
                        <p className="text-gray-200 mt-4 text-lg sm:text-xl max-w-xl">
                            JuanPasabuy PH is your trusted partner in bringing
                            premium Dubai electronics, fashion, cosmetics, and
                            luxury items right to your doorstep in the
                            Philippines. Shop with confidence and authenticity
                            guaranteed.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Link href={route("catalog")}>
                                <button
                                    className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                    aria-label="Browse our Dubai product catalog"
                                >
                                    Shop Dubai Products Now
                                </button>
                            </Link>
                            <Link href={route("about")}>
                                <button className="px-8 py-[0.6rem] bg-transparent border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                                    Learn More About Us
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="mb-20" role="complementary">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="text-blue-500 text-3xl mb-3 flex justify-center">
                            <div className="bg-gray-100 p-3 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Authentic Products
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Every item personally sourced and verified from
                            Dubai's premium retailers
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="text-blue-500 text-3xl mb-3 flex justify-center">
                            <div className="bg-gray-100 p-3 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="1" y="3" width="15" height="13" />
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                    <circle cx="5.5" cy="18.5" r="2.5" />
                                    <circle cx="18.5" cy="18.5" r="2.5" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Secure Delivery
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Safe and reliable shipping from Dubai to Philippines
                            with tracking
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="text-blue-500 text-3xl mb-3 flex justify-center">
                            <div className="bg-gray-100 p-3 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Premium Quality
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Luxury and high-end products from Dubai's finest
                            shopping destinations
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="mb-16" role="main">
                <HomeProducts
                    products={featuredProducts}
                    title="Featured Products"
                    description="Handpicked premium products from Dubai's top retailers. Each
                item is personally sourced and verified for authenticity"
                />
            </section>

            {/* Popular Products Section */}
            <section className="mb-16" role="main">
                <HomeProducts
                    products={popularProducts}
                    title="Popular Products"
                    description="Discover what other customers love most. These trending
                    items from Dubai are flying off our virtual shelves."
                />
            </section>

            {/* Why Choose JuanPasabuy PH */}
            <section
                className="mb-32 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-10 xl:-mx-20 2xl:-mx-40 px-4 sm:px-6 lg:px-10 xl:px-20 2xl:px-40"
                role="complementary"
            >
                <div className="mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10">
                        Why Choose JuanPasabuy PH for Dubai Shopping?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-[#f2f2f2] p-8 rounded-2xl text-center flex flex-col items-center shadow-sm transition-all duration-300 hover:shadow-xl">
                            <svg
                                className="h-16 w-16 mb-6 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                                <path d="M10 6h4" />
                                <path d="M10 10h4" />
                                <path d="M10 14h4" />
                                <path d="M10 18h4" />
                            </svg>

                            <h3 className="font-bold text-xl mb-2 text-red-500">
                                Direct from Dubai
                            </h3>
                            <p className="text-gray-500 text-base leading-relaxed;">
                                Products sourced directly from Dubai's premium
                                shopping destinations.
                            </p>
                        </div>
                        <div className="bg-[#f2f2f2] p-8 rounded-2xl text-center flex flex-col items-center shadow-sm transition-all duration-300 hover:shadow-xl">
                            <svg
                                className="h-16 w-16 mb-6 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </svg>
                            <h3 className="font-bold text-xl mb-2 text-red-500">
                                Authenticity Guaranteed
                            </h3>
                            <p className="text-gray-500 text-base leading-relaxed;">
                                We guarantee the authenticity of all our
                                products.
                            </p>
                        </div>
                        <div className="bg-[#f2f2f2] p-8 rounded-2xl text-center flex flex-col items-center shadow-sm transition-all duration-300 hover:shadow-xl">
                            <svg
                                className="h-16 w-16 mb-6 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <line x1="19" x2="5" y1="5" y2="19" />
                                <circle cx="6.5" cy="6.5" r="2.5" />
                                <circle cx="17.5" cy="17.5" r="2.5" />
                            </svg>

                            <h3 className="font-bold text-xl mb-2 text-red-500">
                                Competitive Pricing
                            </h3>
                            <p className="text-gray-500 text-base leading-relaxed">
                                Enjoy competitive pricing on all our items.
                            </p>
                        </div>
                        <div className="bg-[#f2f2f2] p-8 rounded-2xl text-center flex flex-col items-center shadow-sm transition-all duration-300 hover:shadow-xl">
                            <svg
                                className="h-16 w-16 mb-6 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M7 10v12" />
                                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                            <h3 className="font-bold text-xl mb-2 text-red-500">
                                Fast &amp; Reliable Delivery
                            </h3>
                            <p className="text-gray-500 text-base leading-relaxed">
                                Fast and reliable delivery to your doorstep.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="mb-16" role="complementary">
                <Reviews />
            </section>
        </Layout>
    );
}
