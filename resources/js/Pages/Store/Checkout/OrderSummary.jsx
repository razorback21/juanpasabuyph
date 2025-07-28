export default function OrderSummary({ cartItems, cartTotal }) {
    function CartItem({ item }) {
        return (
            <>
                <div className="flex gap-4 items-start" key={item.product.id}>
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-md size-16 shadow"
                        style={{
                            backgroundImage: `url("${item.product.featured_image_url}")`,
                        }}
                    ></div>
                    <div className="flex-1">
                        <p className="text-sm font-medium leading-normal">
                            {item.product.name}
                        </p>
                        <p className="text-xs font-normal leading-normal">
                            <span className="text-gray-500">
                                ₱{item.product.price}
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
                                {item.quantity}
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
            </>
        );
    }

    return (
        <div className="sticky top-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-[1.3rem] font-bold section-title border-b border-gray-300 pb-4 mb-4">
                Order Summary
            </h2>
            <div className="space-y-6">
                <div className="flex flex-col gap-4">
                    {cartItems.map((item) => (
                        <CartItem item={item} />
                    ))}
                </div>
            </div>
            <div className="border-t border-gray-300 mt-6 pt-6 space-y-2">
                {/* <div className="flex justify-between items-center">
                    <p className="text-[var(--text-secondary)] text-sm font-normal leading-normal">
                        Subtotal
                    </p>
                    <p className="text-[var(--nav-text-color)] text-sm font-medium leading-normal">
                        ₱{cartTotal}
                    </p>
                </div> */}
                {/* <div className="flex justify-between items-center">
                    <p className="text-sm font-normal leading-normal">
                        Shipping
                    </p>
                    <p className="text-sm font-medium leading-normal">$5.99</p>
                </div> */}
                <div className="flex justify-between items-center ">
                    <p className="text-lg font-bold leading-normal">Total</p>
                    <p className="text-lg font-bold leading-normal">
                        ₱{cartTotal}
                    </p>
                </div>
            </div>
        </div>
    );
}
