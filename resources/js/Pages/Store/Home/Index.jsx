import { useEffect, useRef } from "react";
import Layout from "@/Pages/Store/components/Layout.jsx";
import HomeProducts from "../components/HomeProducts";
import Reviews from "../components/Reviews";
import WhyChoose from "./WhyChoose";
import { Link, router } from "@inertiajs/react";

export default function ({ title, featuredProducts, popularProducts }) {
    const trackRef = useRef(null);

    function handleOrderTracking(e) {
        router.get(route("track", { order_id: trackRef.current.value }));
    }

    return (
        <Layout title={title}>
            {/* Hero Section - Main Value Proposition */}
            <section className="w-full @container mb-12" role="banner">
                <div
                    className="bg-cover bg-no-repeat bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[400px] sm:min-h-[500px] shadow-lg "
                    style={{
                        backgroundImage:
                            'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 40%), url("/storage/assets/pdala_hero_bg.png")',
                    }}
                >
                    <div className="p-8 sm:p-12">
                        <h1 className="text-white text-3xl sm:text-5xl font-bold leading-tight tracking-tight max-w-2xl">
                            Discover Authentic Dubai Products delivered to
                            Philippines
                        </h1>
                        <p className="text-gray-200 mt-4 text-lg sm:text-xl max-w-xl">
                            JuanPasabuy PH is your trusted partner in bringing
                            premium Dubai electronics, fashion, cosmetics, and
                            luxury items and many more right to your doorstep in
                            the Philippines. Shop with confidence and
                            authenticity guaranteed.
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
            {/* Mobile Tracking */}
            <section className="sm:hidden mb-12 flex justify-center">
                <div className="p-4 sm:p-6 bg-blue-950 text-white rounded-lg shadow-lg max-w-2xl w-full">
                    <h4 className="text-xs font-medium text-gray-200 mb-4 uppercase tracking-wide text-center">
                        Track Your Order
                    </h4>
                    <form className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M2 6h4" />
                                    <path d="M2 10h4" />
                                    <path d="M2 14h4" />
                                    <path d="M2 18h4" />
                                    <rect
                                        width="16"
                                        height="20"
                                        x="4"
                                        y="2"
                                        rx="2"
                                    />
                                    <path d="M9.5 8h5" />
                                    <path d="M9.5 12H16" />
                                    <path d="M9.5 16H14" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="w-full text-center py-3 rounded-lg border border-[#d1d5db] bg-white pl-10 pr-4 text-lg text-gray-600 font-extrabold placeholder:font-normal placeholder:text-gray-400 focus:outline-none transition-colors uppercase"
                                placeholder="Enter your order number."
                                defaultValue=""
                                ref={trackRef}
                            />
                        </div>
                        <button
                            onClick={handleOrderTracking}
                            type="button"
                            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            aria-label="Submit"
                        >
                            Track
                        </button>
                    </form>
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
                <WhyChoose />
            </section>

            {/* Customer Reviews Section */}
            <section className="mb-16" role="complementary">
                <Reviews />
            </section>
        </Layout>
    );
}
