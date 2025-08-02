import { Head } from "@inertiajs/react";
import Footer from "./Footer";
import Logo from "./Logo";
import { Link, usePage } from "@inertiajs/react";
import NavLink from "../components/NavLinks";

export default function ({ title, children }) {
    const props = usePage().props;

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <Head title={title} />
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e0e0e0] px-4 sm:px-10 py-4 shadow-sm bg-white">
                    <div className="flex items-center gap-3 sm:gap-10">
                        <div className="flex items-center gap-3 text-[#e92933]">
                            <Link href="/">
                                <Logo />
                            </Link>
                        </div>
                        <NavLink />
                    </div>
                    <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4">
                        <div className="flex gap-2">
                            <Link href={route("checkout")}>
                                <button className="relative flex items-center justify-center rounded-lg h-10 w-10 bg-white hover:bg-[#f3f4f6] text-[#4b5563] hover:text-[#e92933] transition-colors border border-[#d1d5db]">
                                    <svg
                                        fill="currentColor"
                                        height="20px"
                                        viewBox="0 0 256 256"
                                        width="20px"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path>
                                    </svg>
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#e92933] text-xs font-bold text-white">
                                        {props.cartCount}
                                    </span>
                                </button>
                            </Link>
                        </div>
                        <button
                            className="lg:hidden flex items-center justify-center rounded-lg h-10 w-10 bg-white hover:bg-[#f3f4f6] text-[#4b5563] hover:text-[#e92933] transition-colors border border-[#d1d5db]"
                            id="menu-button"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 6h16M4 12h16m-7 6h7"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div
                        className="hidden lg:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50 p-4"
                        id="mobile-menu"
                    >
                        <nav className="flex flex-col gap-4">
                            <a
                                className="text-[#4b5563] hover:text-[#e92933] text-sm font-medium leading-normal transition-colors py-2"
                                href="#"
                            >
                                Home
                            </a>
                            <a
                                className="text-[#4b5563] hover:text-[#e92933] text-sm font-medium leading-normal transition-colors py-2"
                                href="#"
                            >
                                Stores
                            </a>
                            <a
                                className="text-[#4b5563] hover:text-[#e92933] text-sm font-medium leading-normal transition-colors py-2"
                                href="#"
                            >
                                Categories
                            </a>
                            <a
                                className="text-[#4b5563] hover:text-[#e92933] text-sm font-medium leading-normal transition-colors py-2"
                                href="#"
                            >
                                Deals
                            </a>
                            <label className="relative flex-col min-w-0 !h-10 max-w-xs mt-2 md:hidden">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#6b7280]">
                                    <svg
                                        fill="currentColor"
                                        height="20px"
                                        viewBox="0 0 256 256"
                                        width="20px"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                                    </svg>
                                </div>
                                <input
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#e92933] border border-[#d1d5db] bg-white h-full placeholder:text-[#9ca3af] pl-10 pr-4 text-sm font-normal leading-normal"
                                    placeholder="Search products..."
                                    defaultValue=""
                                />
                            </label>
                        </nav>
                    </div>
                </header>

                <main className="px-4 sm:px-6 lg:px-10 xl:px-20 2xl:px-40 flex flex-1 py-8 bg-gray-50">
                    <div className="px-4 flex flex-1 justify-center py-8">
                        <div className="layout-content-container flex flex-col max-w-screen-xl flex-1">
                            {children}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}
