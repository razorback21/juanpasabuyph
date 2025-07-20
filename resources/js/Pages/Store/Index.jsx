import Layout from "@/Pages/Store/components/Layout.jsx";

export default function ({ title }) {
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
                            curate and deliver premium Dubai products to your
                            Philippine doorstep, offering exclusive deals on
                            world-renowned brands at prices you won't believe.
                        </p>
                        <button className="mt-8 px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                            Shop Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="mb-12">
                <h2 className="text-gray-900 text-3xl font-bold leading-tight tracking-tight px-4 pb-6">
                    Featured Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                    <div className="flex h-full flex-1 flex-col gap-3 rounded-lg min-w-[280px] bg-white p-4 shadow-md hover:shadow-xl transition-shadow">
                        <div
                            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCY-wVJE0w8ZrAtAtrEgCz8ypKEWHc_bRkAci3is6QPYXsH9l0sZHuAcUKvxzOrTRnjRTiL_pT1b0D8U1nbvC89Ns9wz-r6guXov8t6L79ckS3yVGYz3zXLKgBsbQhQoNeWhds7D4rlg9epbnU3vT8AfjxzSLSf0n81t4Qbdql_-xDoZGwHVKsS8ZbKYPdaf-K55Q1wQxAYJsMrMgCLBERrmbS09b8MkFMtWygT-Ikyt0azG2wUW02TUlbSiOrzHqafGtQj4BQYgMDm")',
                            }}
                        />
                        <div>
                            <h3 className="text-gray-800 text-lg font-semibold leading-normal">
                                Elegant Sofa
                            </h3>
                            <p className="text-gray-600 text-sm font-normal leading-normal">
                                Perfect for your living room
                            </p>
                            <p className="text-red-600 text-lg font-bold mt-2">
                                $499.99
                            </p>
                        </div>
                    </div>
                    <div className="flex h-full flex-1 flex-col gap-3 rounded-lg min-w-[280px] bg-white p-4 shadow-md hover:shadow-xl transition-shadow">
                        <div
                            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAlVVOOPX23T-GXOmKCji3aXTYxA3slaMTsUmp3ZGxcK0nws1EvhS7KTqzMvnP67hMLqqF2-QGK9C6zXXeSYnn0UNe_SvOmSPAG8Q_sGk3t8-o0eajrA_ppueecZCV62IocEAKoEA7aysNJyuXEX3i7AE03_ke5WVRJs3ty-frSWQTYoj2Yg1NCSp8SvjYIpTYmEl5cBGgHLagcAH_-tR7cy5W_axp0hSwUlEF14T3bsfb9GcaF3yQbXn6nEQgBapUaxw0_XqhJZ122")',
                            }}
                        />
                        <div>
                            <h3 className="text-gray-800 text-lg font-semibold leading-normal">
                                Dining Table Set
                            </h3>
                            <p className="text-gray-600 text-sm font-normal leading-normal">
                                Ideal for family dinners
                            </p>
                            <p className="text-red-600 text-lg font-bold mt-2">
                                $799.00
                            </p>
                        </div>
                    </div>
                    <div className="flex h-full flex-1 flex-col gap-3 rounded-lg min-w-[280px] bg-white p-4 shadow-md hover:shadow-xl transition-shadow">
                        <div
                            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCbgtT2joGYIjUgyFWV4zM3Xj5imlapcuzlsKL_aorYd8DITHAZLlLVB6MMXEpf0WUjx2HcEoESf0XJZZbMprBKzLMuNaEZ5RtIy4YBWExAmzujKafaKrmgEi15ozhsH0zb5o-2cccHJ_qgLP7B29rdLmGjOCoM_SUSsUDch8HUjFAryqtWTiOWnM8SJTxw7BgCpcdIlE--0dg01aZI1bUiqtTXD0VBYtCdIdDZOWb-n1480W5y-NuBh7G2yab0M3QG3a_CPSaGaCQx")',
                            }}
                        />
                        <div>
                            <h3 className="text-gray-800 text-lg font-semibold leading-normal">
                                Comfortable Bed
                            </h3>
                            <p className="text-gray-600 text-sm font-normal leading-normal">
                                Sleep soundly and wake refreshed
                            </p>
                            <p className="text-red-600 text-lg font-bold mt-2">
                                $650.50
                            </p>
                        </div>
                    </div>
                    <div className="flex h-full flex-1 flex-col gap-3 rounded-lg min-w-[280px] bg-white p-4 shadow-md hover:shadow-xl transition-shadow">
                        <div
                            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6SwkO35IjE83Ya0mByR8JdBE2qlqL1hvEmyKTGsd6R3V0KLhV0wHSYHVByZtxnWSstyQwHo4PVWLRvVNPgoCdkwaTBh29aolUl5i1ITH4N_jUGFUm0HzFEI-mh5VRNVHQVABS_PoCPpMvEA1zk8jRS2dyP-qOj7rgf7lLK4Jc8_Y26CwyoP4B4IuNLmH0q8JYqZW0mcIZxu_xoCVFbHR-XuCcgV1Rq4RLXtBXhaiIo-fUrFugoHBGT_nIMW1eTEu8sft3Ys1ZiWds")',
                            }}
                        />
                        <div>
                            <h3 className="text-gray-800 text-lg font-semibold leading-normal">
                                Stylish Desk
                            </h3>
                            <p className="text-gray-600 text-sm font-normal leading-normal">
                                Work from home in style
                            </p>
                            <p className="text-red-600 text-lg font-bold mt-2">
                                $220.00
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="mb-12">
                <h2 className="text-gray-900 text-3xl font-bold leading-tight tracking-tight px-4 pb-6">
                    Best Sellers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                    <div className="flex flex-col gap-3 pb-3 bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div
                            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAndIFj5-ldEBUngqZ0Nibs1hhgS8tJmpR5SQuPrnqjT1UYICipfs_aD28qwIcPjOkBsOM33ZEMvvYf72Z3hAxm7DX5VaVr7Q2Swk2nGvqB0Z7syfd0zriZ4UOh6syF0IZDBdFIZNukNigREU2wpvFKlBYWF-sKqpOxLGc1eTOGNiDplP7OPKM596Ik245pW1j5NXeebB9JEK-seDJPEYlkcleFwhRS1croeWQztxSZSeFLJsGjKK17zwzijBAnXiYK8OaHEoyRYp5m")',
                            }}
                        />
                        <h3 className="text-gray-800 text-lg font-semibold leading-normal">
                            Latest Smartwatch
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Stay connected and track your fitness.
                        </p>
                        <p className="text-red-600 text-lg font-bold mt-1">
                            $249.99
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 pb-3 bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div
                            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBoBFdjOzEKheBi4sib6EeXYS79Y_rE6Z40Act7Uby9u4d9n_NBzr409-TuKvhRMRax1pivU9uO2vvPXezpRlUtKGgxiBUyNFnkk21V-kCIomOMMyQ7n6GXNLhJmbikw0Usq9SiTPYT83rOi5Bt0lGvFySxShnQTv-MRrAXVts6zHgsXgAWxEpaQxFXySjWFmsUM1yG699JgcjBbwyi57xEdT7-01Cbe23cMwQkBDz05eNVBmPCqJ2dmV-kX7bV0k0p42UlLvWsAiG")',
                            }}
                        />
                        <h3 className="text-gray-800 text-lg font-semibold leading-normal">
                            Designer Handbag
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Elevate your style with this chic accessory.
                        </p>
                        <p className="text-red-600 text-lg font-bold mt-1">
                            $350.00
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 pb-3 bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div
                            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUREMakJRiChF6fIU55Lp30TQIIQh0OSj7crH7hqY1olki-1sOj2rhbrNsecUkDJe6SFL5Fc63jfWfKq2GUaMMiQ7NVIjp-vAXgEreJnJ-a8ZhlcqbA6t2OQJpSTic7rUIzgUpAKoWLQB2h3BaPePbnCty2j5LgKgACsetZC60Tj-EsTIclEQym76JSmLxkGGOWHpAreBqgrA--nMs8wXj1go_4IITp0afqm5kTaRYJzQhl_P5oXRSpSELu5iCTm7TL8Xl0OAoCcOx")',
                            }}
                        />
                        <h3 className="text-gray-800 text-lg font-semibold leading-normal">
                            Wireless Headphones
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Immersive sound experience on the go.
                        </p>
                        <p className="text-red-600 text-lg font-bold mt-1">
                            $129.50
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 pb-3 bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div
                            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAt7EMgU_SAsV7D4jAIytwOK82iQxzElNXMr3dThwr4JeOT1XemqBR5BuO8p75PDLlEPICFQwajLdiwvicnR4-kebegTmLJOp0DXaQCdUbFhc7w4Eosdhe-2-JaNYva2b-Bx5KS65-yLoeI_4cQiRIt-8Vf4xBXjZ1Sj5VeaKDlkKczHlgoiGe9QfR8d_dwqDUaw3MhO2AVz66tod5fXRuziIt-n9WCe8Ohgq9XzyQqHB0ABerfzN22aGN-Fl48wZ8s79GeBsjFCHNS")',
                            }}
                        />
                        <h3 className="text-gray-800 text-lg font-semibold leading-normal">
                            Hiking Backpack
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Durable and spacious for your adventures.
                        </p>
                        <p className="text-red-600 text-lg font-bold mt-1">
                            $89.99
                        </p>
                    </div>
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="mb-8 sm:mb-12">
                <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold leading-tight tracking-tight px-4 pb-4 sm:pb-6">
                    Customer Reviews
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4">
                    {[
                        {
                            title: "Smartwatch is a game-changer!",
                            review: "Absolutely love the new smartwatch! The battery life is amazing, and it tracks my workouts perfectly. Highly recommend it for anyone looking to stay active and connected.",
                            rating: 4,
                            author: "Sarah M.",
                        },
                        {
                            title: "Designer Handbag is stunning!",
                            review: "The quality of this handbag is exceptional. It's even more beautiful in person! I've received so many compliments. A perfect addition to my collection.",
                            rating: 5,
                            author: "John B.",
                        },
                        {
                            title: "Best Headphones I've owned!",
                            review: "The sound quality of these wireless headphones is incredible! They are comfortable for long listening sessions and the noise cancellation is top-notch. Definitely worth the price.",
                            rating: 5,
                            author: "Emily K.",
                        },
                    ].map((review, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col"
                        >
                            <div className="flex items-center mb-3">
                                <h4 className="text-gray-800 text-base sm:text-lg font-semibold">
                                    {review.title}
                                </h4>
                            </div>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                "{review.review}"
                            </p>
                            <div className="mr-3 text-yellow-400 flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${
                                            i >= review.rating
                                                ? "text-gray-300"
                                                : ""
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-700 text-sm font-medium mt-auto">
                                - {review.author}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
