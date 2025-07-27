import Layout from "@/Pages/Store/components/Layout.jsx";

export default function Checkout() {
    return (
        <Layout>
            <div>
                <h1 className="text-4xl font-bold leading-tight tracking-tight">
                    Checkout
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                    <section className="mt-6">
                        <h2 className="text-2xl font-bold">
                            Shipping Information
                        </h2>
                        <div className="mt-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm leading-normal pb-1.5">
                                        Firstname
                                    </label>
                                    <input
                                        className="ext-gray-500 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                                        placeholder="Enter your firstname"
                                        type="text"
                                        value=""
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm leading-normal pb-1.5">
                                        Lastname
                                    </label>
                                    <input
                                        className="ext-gray-500 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                                        placeholder="Enter your lastname"
                                        type="text"
                                        value=""
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm leading-normal pb-1.5">
                                    Address
                                </label>
                                <input
                                    className="ext-gray-600 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                                    placeholder="Enter your street address"
                                    type="text"
                                    value=""
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                <div>
                                    <label className="block text-sm leading-normal pb-1.5">
                                        City
                                    </label>
                                    <input
                                        className="ext-gray-600 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                                        placeholder="Enter your city"
                                        type="text"
                                        value=""
                                    />
                                </div>
                                <div className="block">
                                    <label className="block text-sm leading-normal pb-1.5">
                                        State / Province
                                    </label>
                                    <input
                                        className="ext-gray-600 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                                        placeholder="Enter state or province"
                                        type="text"
                                        value=""
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                <div className="block">
                                    <label className="block text-sm leading-normal pb-1.5">
                                        Postal Code
                                    </label>
                                    <input
                                        className="ext-gray-600 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                                        placeholder="Enter zip or postal code"
                                        type="text"
                                        value=""
                                    />
                                </div>
                                <div className="block">
                                    <label className="block text-sm leading-normal pb-1.5">
                                        Cell Phone Number
                                    </label>
                                    <input
                                        className="ext-gray-600 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                                        placeholder="Enter your phone number"
                                        type="tel"
                                        value=""
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end mt-16">
                                <button
                                    className="flex w-full md:w-auto min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-sm h-12 px-6 bg-red-600 hover:bg-red-700 text-white text-base font-semibold leading-normal tracking-[0.015em] transition-colors shadow-sm hover:shadow-md"
                                    type="submit"
                                >
                                    <span className="truncate">
                                        Place Order
                                    </span>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
