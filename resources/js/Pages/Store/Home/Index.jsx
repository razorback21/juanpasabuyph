import Layout from "@/Pages/Store/components/Layout.jsx";
import HomeProducts from "../components/HomeProducts";
import Reviews from "../components/Reviews";

export default function ({ title }) {
    const featuredProducts = [
        {
            id: 1,
            name: "Latest Smartwatch",
            description: "Stay connected and track your fitness.",
            price: 249.0,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAndIFj5-ldEBUngqZ0Nibs1hhgS8tJmpR5SQuPrnqjT1UYICipfs_aD28qwIcPjOkBsOM33ZEMvvYf72Z3hAxm7DX5VaVr7Q2Swk2nGvqB0Z7syfd0zriZ4UOh6syF0IZDBdFIZNukNigREU2wpvFKlBYWF-sKqpOxLGc1eTOGNiDplP7OPKM596Ik245pW1j5NXeebB9JEK-seDJPEYlkcleFwhRS1croeWQztxSZSeFLJsGjKK17zwzijBAnXiYK8OaHEoyRYp5m",
        },
        {
            id: 2,
            name: "Designer Handbag",
            description: "Elevate your style with this chic accessory.",
            price: 1249.0,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBoBFdjOzEKheBi4sib6EeXYS79Y_rE6Z40Act7Uby9u4d9n_NBzr409-TuKvhRMRax1pivU9uO2vvPXezpRlUtKGgxiBUyNFnkk21V-kCIomOMMyQ7n6GXNLhJmbikw0Usq9SiTPYT83rOi5Bt0lGvFySxShnQTv-MRrAXVts6zHgsXgAWxEpaQxFXySjWFmsUM1yG699JgcjBbwyi57xEdT7-01Cbe23cMwQkBDz05eNVBmPCqJ2dmV-kX7bV0k0p42UlLvWsAiG",
        },
        {
            id: 3,
            name: "Wireless Headphone",
            price: 2249.0,
            description: "Immersive sound experience on the go.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUREMakJRiChF6fIU55Lp30TQIIQh0OSj7crH7hqY1olki-1sOj2rhbrNsecUkDJe6SFL5Fc63jfWfKq2GUaMMiQ7NVIjp-vAXgEreJnJ-a8ZhlcqbA6t2OQJpSTic7rUIzgUpAKoWLQB2h3BaPePbnCty2j5LgKgACsetZC60Tj-EsTIclEQym76JSmLxkGGOWHpAreBqgrA--nMs8wXj1go_4IITp0afqm5kTaRYJzQhl_P5oXRSpSELu5iCTm7TL8Xl0OAoCcOx",
        },
        {
            id: 4,
            name: "Hiking Backpack",
            description: "Durable and spacious for your adventures.",
            price: 1500.0,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt7EMgU_SAsV7D4jAIytwOK82iQxzElNXMr3dThwr4JeOT1XemqBR5BuO8p75PDLlEPICFQwajLdiwvicnR4-kebegTmLJOp0DXaQCdUbFhc7w4Eosdhe-2-JaNYva2b-Bx5KS65-yLoeI_4cQiRIt-8Vf4xBXjZ1Sj5VeaKDlkKczHlgoiGe9QfR8d_dwqDUaw3MhO2AVz66tod5fXRuziIt-n9WCe8Ohgq9XzyQqHB0ABerfzN22aGN-Fl48wZ8s79GeBsjFCHNS",
        },
    ];

    const bestProducts = [
        {
            id: 1,
            name: "Latest Smartwatch",
            description: "Stay connected and track your fitness.",
            price: 249.0,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAndIFj5-ldEBUngqZ0Nibs1hhgS8tJmpR5SQuPrnqjT1UYICipfs_aD28qwIcPjOkBsOM33ZEMvvYf72Z3hAxm7DX5VaVr7Q2Swk2nGvqB0Z7syfd0zriZ4UOh6syF0IZDBdFIZNukNigREU2wpvFKlBYWF-sKqpOxLGc1eTOGNiDplP7OPKM596Ik245pW1j5NXeebB9JEK-seDJPEYlkcleFwhRS1croeWQztxSZSeFLJsGjKK17zwzijBAnXiYK8OaHEoyRYp5m",
        },
        {
            id: 2,
            name: "Designer Handbag",
            description: "Elevate your style with this chic accessory.",
            price: 1249.0,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBoBFdjOzEKheBi4sib6EeXYS79Y_rE6Z40Act7Uby9u4d9n_NBzr409-TuKvhRMRax1pivU9uO2vvPXezpRlUtKGgxiBUyNFnkk21V-kCIomOMMyQ7n6GXNLhJmbikw0Usq9SiTPYT83rOi5Bt0lGvFySxShnQTv-MRrAXVts6zHgsXgAWxEpaQxFXySjWFmsUM1yG699JgcjBbwyi57xEdT7-01Cbe23cMwQkBDz05eNVBmPCqJ2dmV-kX7bV0k0p42UlLvWsAiG",
        },
        {
            id: 3,
            name: "Wireless Headphone",
            price: 2249.0,
            description: "Immersive sound experience on the go.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUREMakJRiChF6fIU55Lp30TQIIQh0OSj7crH7hqY1olki-1sOj2rhbrNsecUkDJe6SFL5Fc63jfWfKq2GUaMMiQ7NVIjp-vAXgEreJnJ-a8ZhlcqbA6t2OQJpSTic7rUIzgUpAKoWLQB2h3BaPePbnCty2j5LgKgACsetZC60Tj-EsTIclEQym76JSmLxkGGOWHpAreBqgrA--nMs8wXj1go_4IITp0afqm5kTaRYJzQhl_P5oXRSpSELu5iCTm7TL8Xl0OAoCcOx",
        },
        {
            id: 4,
            name: "Hiking Backpack",
            description: "Durable and spacious for your adventures.",
            price: 1500.0,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt7EMgU_SAsV7D4jAIytwOK82iQxzElNXMr3dThwr4JeOT1XemqBR5BuO8p75PDLlEPICFQwajLdiwvicnR4-kebegTmLJOp0DXaQCdUbFhc7w4Eosdhe-2-JaNYva2b-Bx5KS65-yLoeI_4cQiRIt-8Vf4xBXjZ1Sj5VeaKDlkKczHlgoiGe9QfR8d_dwqDUaw3MhO2AVz66tod5fXRuziIt-n9WCe8Ohgq9XzyQqHB0ABerfzN22aGN-Fl48wZ8s79GeBsjFCHNS",
        },
    ];

    return (
        <Layout title={title}>
            {/* Hero */}
            <section className="w-full @container mb-12">
                <div
                    className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[400px] sm:min-h-[500px] shadow-lg"
                    style={{
                        backgroundImage:
                            'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 40%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQg5pGmCR-wlLQ-Pwbh8WLr58lK6LBXvQfF8qvPfo5XrUbCSVD-NIFrz70s9noN94FcYb8dIxxwvrIuJ_-XMCmyqmnaR_kgAiHtpuvtunFo84mYSyaWtxZxYnHXx-19RwqAQbytVOeTCEhWo5fjo0yoWJr2xPhziAtjL9IOD04ilo0qEfJ_i-2BxSdB1D8EmATWRwKcYidvSxnxQKhGGDmiybqM0hFpcrpXa56RFAFQVDEwh0Fglx1srivZHJF_FxLgAEAybHDK0U7")',
                    }}
                >
                    <div className="p-8 sm:p-12">
                        <h2 className="text-white text-3xl sm:text-5xl font-bold leading-tight tracking-tight max-w-2xl">
                            Discover the best deals from Dubai
                        </h2>
                        <p className="text-gray-200 mt-4 text-lg sm:text-xl max-w-xl">
                            Experience luxury shopping made affordable! We
                            curate and deliver premium Dubai products to
                            Philippines doorstep, offering exclusive deals on
                            world-renowned brands at prices you won't believe.
                        </p>
                        <button className="mt-8 px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                            Shop Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <HomeProducts
                products={featuredProducts}
                title="Featured Products"
            />

            {/* New Arrivals */}
            <HomeProducts products={bestProducts} title="Best Sellers" />

            {/* Customer Reviews */}
            <Reviews />
        </Layout>
    );
}
