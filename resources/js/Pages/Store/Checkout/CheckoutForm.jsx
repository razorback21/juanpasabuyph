import { useRef } from "react";

export default function CheckOutForm() {
    const formData = useRef({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        postal_code: "",
    });

    function formChangeHandler(e) {
        const { name, value } = e.target;
        formData.current[name] = value;
    }

    function placeOrder() {
        console.log(formData.current);
    }

    return (
        <>
            <h1 className="text-4xl font-bold leading-tight tracking-tight mb-10">
                Checkout
            </h1>
            <h2 className="text-[1.3rem] font-bold">Shipping Information</h2>
            <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm leading-normal pb-1.5">
                            Firstname *
                        </label>
                        <input
                            className="ext-gray-500 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                            placeholder="Enter your firstname"
                            type="text"
                            name="firstname"
                            defaultValue={formData.current.firstname}
                            onChange={formChangeHandler}
                        />
                    </div>
                    <div>
                        <label className="block text-sm leading-normal pb-1.5">
                            Lastname *
                        </label>
                        <input
                            className="ext-gray-500 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                            placeholder="Enter your lastname"
                            type="text"
                            name="lastname"
                            defaultValue={formData.current.lastname}
                            onChange={formChangeHandler}
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <label className="block text-sm leading-normal pb-1.5">
                        Address *
                    </label>
                    <input
                        className="ext-gray-600 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                        placeholder="Enter your street address"
                        type="text"
                        name="address"
                        defaultValue={formData.current.address}
                        onChange={formChangeHandler}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <div>
                        <label className="block text-sm leading-normal pb-1.5">
                            City *
                        </label>
                        <input
                            className="ext-gray-600 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                            placeholder="Enter your city"
                            type="text"
                            name="city"
                            defaultValue={formData.current.city}
                            onChange={formChangeHandler}
                        />
                    </div>
                    <div className="block">
                        <label className="block text-sm leading-normal pb-1.5">
                            State / Province *
                        </label>
                        <input
                            className="ext-gray-600 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                            placeholder="Enter state or province"
                            type="text"
                            name="province"
                            defaultValue={formData.current.province}
                            onChange={formChangeHandler}
                        />
                    </div>
                    <div className="block">
                        <label className="block text-sm leading-normal pb-1.5">
                            Postal Code *
                        </label>
                        <input
                            className="ext-gray-600 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                            placeholder="Enter zip or postal code"
                            type="text"
                            name="postal_code"
                            defaultValue={formData.current.postal_code}
                            onChange={formChangeHandler}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="block">
                        <label className="block text-sm leading-normal pb-1.5">
                            Email Address *
                        </label>
                        <input
                            className="ext-gray-600 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                            placeholder="Enter your email address"
                            type="text"
                            name="email"
                            defaultValue={formData.current.email}
                            onChange={formChangeHandler}
                        />
                    </div>
                    <div className="block">
                        <label className="block text-sm leading-normal pb-1.5">
                            Cell Phone Number *
                        </label>
                        <input
                            className="ext-gray-600 form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 border border-[#dfe0e2] bg-white h-12 placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-colors"
                            placeholder="Enter your phone number"
                            type="tel"
                            name="phone"
                            defaultValue={formData.current.phone}
                            onChange={formChangeHandler}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-16">
                    <button
                        onClick={placeOrder}
                        className="flex w-full md:w-auto min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-sm h-12 px-6 bg-red-600 hover:bg-red-700 text-white text-base font-semibold leading-normal tracking-[0.015em] transition-colors shadow-sm hover:shadow-md"
                        type="submit"
                    >
                        <span className="truncate">Place Order</span>
                    </button>
                </div>
            </div>
        </>
    );
}
