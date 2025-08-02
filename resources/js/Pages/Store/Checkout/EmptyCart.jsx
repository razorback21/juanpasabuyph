import { Link } from "@inertiajs/react";

export default function () {
    return (
        <main className="flex-1 px-6 md:px-16 lg:px-24 xl:px-40 py-10 flex items-center justify-center">
            <div className="text-center space-y-6">
                <div className="inline-block p-5 bg-gray-200 rounded-full">
                    <svg
                        className="text-red-500"
                        fill="currentColor"
                        height="64"
                        viewBox="0 0 256 256"
                        width="64"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M216,48H40a16,16,0,0,0-16,16V176H232V64A16,16,0,0,0,216,48ZM40,64H216v16H40ZM216,96v64H40V96ZM24,192a8,8,0,0,0-8,8,16,16,0,0,0,16,16H224a16,16,0,0,0,16-16,8,8,0,0,0-16,0H40a8,8,0,0,0,0-16Z"></path>
                    </svg>
                </div>
                <h1 className="tracking-tight text-4xl md:text-5xl font-bold leading-tight">
                    Your Cart is Empty
                </h1>
                <p className="text-gray-600 text-text-lg font-normal leading-relaxed max-w-md mx-auto">
                    Looks like you haven't added anything to your cart yet.
                    Start exploring our catalog and find something you love!
                </p>
                <div className="flex justify-center">
                    <Link href={route("catalog")}>
                        <button
                            className="flex md:w-auto min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-sm h-12 px-6 bg-red-600 hover:bg-red-700 text-white text-base font-semibold leading-normal tracking-[0.015em] transition-colors shadow-sm hover:shadow-md"
                            type="submit"
                        >
                            <span className="truncate">Continue shopping</span>
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
