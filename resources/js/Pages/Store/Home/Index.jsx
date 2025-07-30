import Layout from "@/Pages/Store/components/Layout.jsx";
import HomeProducts from "../components/HomeProducts";
import Reviews from "../components/Reviews";
import { Link } from "@inertiajs/react";

export default function ({ title, featuredProducts, bestProducts }) {
    return (
        <Layout title={title}>
            {/* Hero */}
            <section className="w-full @container mb-12">
                <div
                    className="bg-contain bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[400px] sm:min-h-[500px] shadow-lg"
                    style={{
                        backgroundImage:
                            'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 40%), url("/storage/assets/pdala_hero_bg.png")',
                    }}
                >
                    <div className="p-8 sm:p-12">
                        <h2 className="text-white text-3xl sm:text-5xl font-bold leading-tight tracking-tight max-w-2xl">
                            Discover the best deals from Dubai
                        </h2>
                        <p className="text-gray-200 mt-4 text-lg sm:text-xl max-w-xl">
                            JuanPasabuy PH, your trusted partner in bringing
                            premium Dubai products right to your doorstep!
                        </p>
                        <Link href={route("catalog")}>
                            <button className="mt-8 px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                                Shop Now
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section>
                <HomeProducts
                    products={featuredProducts}
                    title="Featured Products"
                />
            </section>

            {/* New Arrivals */}
            <section>
                <HomeProducts
                    products={bestProducts}
                    title="Popular Products"
                />
            </section>

            {/* Customer Reviews */}
            <section>
                <Reviews />
            </section>
        </Layout>
    );
}
