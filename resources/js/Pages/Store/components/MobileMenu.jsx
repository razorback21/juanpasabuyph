import { usePage } from "@inertiajs/react";

export default function ({ linksData, onLinkClick }) {
    const page = usePage();
    function highlightActiveLink(component) {
        if (page.component === component) {
            return "text-red-600";
        } else {
            return "text-white";
        }
    }

    return (
        <nav className="flex flex-col gap-4 ">
            {linksData.map((link, index) => (
                // <a
                //     key={index}
                //     className={`${highlightActiveLink(
                //         link.component
                //     )} hover:text-[#e92933] text-base font-semibold leading-relaxed transition-all duration-300 py-3 px-4 rounded-tl-xl rounded-br-xl hover:bg-blue-200 text-center block transform hover:scale-105 hover:shadow-sm border border-blue-300`}
                //     href={link.href}
                //     onClick={onLinkClick}
                // >
                //     {link.name}
                // </a>
                <a
                    key={index}
                    className={`${highlightActiveLink(
                        link.component
                    )} hover:text-red-600 hover:underline`}
                    href={link.href}
                    onClick={onLinkClick}
                >
                    {link.name}
                </a>
            ))}
            {/* Order Search Form */}
            {/* <div className="mt-6 p-5 bg-white/60 backdrop-blur-sm rounded-mdl border border-gray-100/50 shadow-sm">
                <h4 className="text-xs font-medium text-gray-500 mb-4 uppercase tracking-wide">
                    Track Your Order
                </h4>
                <form
                    className="space-y-4"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <svg
                                fill="currentColor"
                                height="16px"
                                viewBox="0 0 256 256"
                                width="16px"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="w-full h-11 pl-10 pr-4 text-sm bg-gray-50/50 border border-gray-200/60 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#e92933]/30 focus:border-[#e92933]/30 focus:bg-white placeholder:text-gray-400 transition-all duration-300"
                            placeholder="Enter order number"
                            defaultValue=""
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full h-11 bg-gradient-to-r from-[#e92933]/90 to-[#d41f2a]/90 hover:from-[#e92933] hover:to-[#d41f2a] text-white font-medium text-sm rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#e92933]/20 focus:ring-offset-1"
                    >
                        Track Order
                    </button>
                </form>
            </div> */}
        </nav>
    );
}
