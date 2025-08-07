import Layout from "../components/Layout";

export default function () {
    return (
        <>
            <Layout title="About Us">
                <section className="w-full @container mb-12" role="banner">
                    <div
                        className="bg-cover bg-no-repeat bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[400px] sm:min-h-[500px] shadow-lg"
                        style={{
                            backgroundImage:
                                'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 40%), url("/storage/assets/about.jpg")',
                        }}
                    >
                        <div className="p-8 sm:p-12">
                            {/* <h2 className="text-white text-3xl sm:text-5xl font-bold leading-tight tracking-tight max-w-2xl">
                                    Discover the best deals from Dubai
                                </h2> */}
                            <p className="text-gray-200 mt-4 text-lg sm:text-xl max-w-xl">
                                JuanPasabuy PH, your trusted partner in
                                bringing premium Dubai products right to
                                your doorstep!
                            </p>
                        </div>
                    </div>
                </section>
                <section className="flex flex-wrap justify-between items-center gap-4 p-4">
                        <div className="w-full">
                            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                                <h2 className="tracking-tight text-3xl sm:text-4xl font-bold leading-tight min-w-72">
                                    About Us
                                </h2>
                            </div>

                            <p className="mt-4 text-gray-500 text-lg">
                                Welcome to JuanPasabuy PH, your trusted partner
                                in bringing premium Dubai products right to your
                                doorstep! We take pride in personally
                                handpicking high-quality items from Dubai's most
                                prestigious malls and making them accessible to
                                Filipino shoppers through our convenient online
                                platform. Our unique "Padala Service" combines
                                traditional Filipino shopping culture with
                                modern e-commerce convenience. Here's how it
                                works: you browse our carefully curated
                                selection, place your order through our
                                user-friendly shopping cart, make a secure down
                                payment, and we handle everything else - from
                                purchasing your desired items in Dubai to
                                ensuring they reach you safely in the
                                Philippines. What sets us apart is our
                                commitment to authenticity and personal service.
                                Every product in our catalog has been personally
                                sourced and photographed by our team in Dubai,
                                giving you the confidence that what you see is
                                exactly what you'll get. We bridge the gap
                                between Dubai's luxurious shopping experience
                                and Philippine homes, making international
                                shopping accessible and hassle-free. Whether
                                you're looking for fashion items, electronics,
                                cosmetics, or unique finds from Dubai, we're
                                here to make your shopping dreams come true.
                                Trust JuanPasabuy PH to be your shopping
                                companion in bringing the Dubai shopping
                                experience closer to home.
                            </p>
                        </div>
                    </section>

            </Layout>
        </>
    );
}
