import Layout from "@/Pages/Store/components/Layout.jsx";

export default function Checkout() {
    return (
        <Layout>
            <section className="grid grid-cols-1 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-7">
                    <h1 className="text-4xl font-bold leading-tight tracking-tight mb-10">
                        Checkout
                    </h1>
                    <h2 className="text-[1.3rem] font-bold">
                        Shipping Information
                    </h2>
                    <div className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm leading-normal pb-1.5">
                                    Firstname
                                </label>
                                <input
                                    className="ext-gray-500 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                                    placeholder="Enter your firstname"
                                    type="text"
                                    defaultValue=""
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
                                    defaultValue=""
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
                                defaultValue=""
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
                                    defaultValue=""
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
                                    defaultValue=""
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
                                    defaultValue=""
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
                                    defaultValue=""
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-16">
                            <button
                                className="flex w-full md:w-auto min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-sm h-12 px-6 bg-red-600 hover:bg-red-700 text-white text-base font-semibold leading-normal tracking-[0.015em] transition-colors shadow-sm hover:shadow-md"
                                type="submit"
                            >
                                <span className="truncate">Place Order</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-5">
                    <div className="sticky top-8 bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-[1.3rem] font-bold section-title border-b border-gray-300 pb-4 mb-4">
                            Order Summary
                        </h2>
                        <div className="space-y-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4 items-start">
                                    <div
                                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-md size-16 shadow"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBuXnCsCgI2REl1SDvgR0GPAzRnoR0UJ_9C_B3L7Pw0-mYYx1eBMYqJ08NVSrTKjzVoghRrZzI4h07rfllOLxiqlmKKCJyKKbKB4FpLHXeI5MBxPISUBK2F5eo-7lWl2S_jB_UxWaFpFyYRKgEEdESj3vg3vMWnMUQwXHhK_JXry6pUbM79tBx6sR_CgcW2sHSf5gBLT6dqloGBIl2dszJ-Of-8RRs0wkxcSmRq-uWyzL-l08IZK2mYVaOFmAakHP2JgUuM9w5Exts")',
                                        }}
                                    ></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium leading-normal">
                                            TechGadget Pro X
                                        </p>
                                        <p className="text-xs font-normal leading-normal">
                                            <span className="text-gray-500">
                                                $299.99
                                            </span>
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button className="size-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-slate-200 transition-colors">
                                                <svg
                                                    fill="currentColor"
                                                    height="16"
                                                    viewBox="0 0 256 256"
                                                    width="16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path>
                                                </svg>
                                            </button>
                                            <span className="text-[var(--nav-text-color)] text-sm font-medium w-4 text-center">
                                                1
                                            </span>
                                            <button className="size-6 rounded-full border border- flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-slate-200 transition-colors">
                                                <svg
                                                    fill="currentColor"
                                                    height="16"
                                                    viewBox="0 0 256 256"
                                                    width="16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <button className="hover:text-red-600 transition-colors text-xs font-medium">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-300 mt-6 pt-6 space-y-2">
                            <div className="flex justify-between items-center">
                                <p className="text-[var(--text-secondary)] text-sm font-normal leading-normal">
                                    Subtotal
                                </p>
                                <p className="text-[var(--nav-text-color)] text-sm font-medium leading-normal">
                                    $379.94
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-normal leading-normal">
                                    Shipping
                                </p>
                                <p className="text-sm font-medium leading-normal">
                                    $5.99
                                </p>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-300 mt-2">
                                <p className="text-lg font-bold leading-normal">
                                    Total
                                </p>
                                <p className="text-lg font-bold leading-normal">
                                    $385.93
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
