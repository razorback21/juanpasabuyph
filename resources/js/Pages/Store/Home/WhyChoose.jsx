export default function WhyChoose() {
    return (
        <div className="mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
                Why Choose JuanPasabuyPH for Dubai Shopping?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#f2f2f2] p-8 rounded-2xl text-center flex flex-col items-center shadow-sm transition-all duration-300 hover:shadow-xl">
                    <svg
                        className="h-16 w-16 mb-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
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

                    <h3 className="font-bold text-xl mb-2">
                        Direct from Dubai
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed">
                        Products sourced directly from Dubai's premium shopping
                        destinations.
                    </p>
                </div>
                <div className="bg-[#f2f2f2] p-8 rounded-2xl text-center flex flex-col items-center shadow-sm transition-all duration-300 hover:shadow-xl">
                    <svg
                        className="h-16 w-16 mb-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                    <h3 className="font-bold text-xl mb-2">
                        Authenticity Guaranteed
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed;">
                        We guarantee the authenticity of all our products.
                    </p>
                </div>
                <div className="bg-[#f2f2f2] p-8 rounded-2xl text-center flex flex-col items-center shadow-sm transition-all duration-300 hover:shadow-xl">
                    <svg
                        className="h-16 w-16 mb-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line x1="19" x2="5" y1="5" y2="19" />
                        <circle cx="6.5" cy="6.5" r="2.5" />
                        <circle cx="17.5" cy="17.5" r="2.5" />
                    </svg>

                    <h3 className="font-bold text-xl mb-2">
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
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                    </svg>
                    <h3 className="font-bold text-xl mb-2">
                        Fast &amp; Reliable Delivery
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed">
                        Fast and reliable delivery to your doorstep.
                    </p>
                </div>
            </div>
        </div>
    );
}
