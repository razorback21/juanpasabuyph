import { Head } from "@inertiajs/react";
import Footer from "./Footer";
import Logo from "./Logo";
import { Link, usePage } from "@inertiajs/react";
import NavLink from "../components/NavLinks";
import MobileMenu from "../components/MobileMenu";
import { useState } from "react";

const LinksData = [
    {
        name: "Home",
        href: "/",
        component: "Store/Home/Index",
    },
    {
        name: "Products",
        href: "/catalog",
        component: "Store/Catalog/Index",
    },
    {
        name: "About",
        href: "/about",
        component: "Store/About/Index",
    },
    {
        name: "Faqs",
        href: "/faqs",
        component: "Store/Faqs/Index",
    },
    {
        name: "Contact",
        href: "/contact",
        component: "Store/Contact/Index",
    },
];

export default function ({ title, children }) {
    const props = usePage().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

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
                        <NavLink linksData={LinksData} />
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
                            onClick={toggleMobileMenu}
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
                    {/* Mobile Menu Overlay */}
                    {isMobileMenuOpen && (
                        <div
                            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={toggleMobileMenu}
                        />
                    )}

                    {/* Mobile Menu Sidebar */}
                    <div
                        className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
                            isMobileMenuOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }`}
                        id="mobile-menu"
                    >
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <Logo />
                                <button
                                    onClick={toggleMobileMenu}
                                    className="flex items-center justify-center rounded-lg h-8 w-8 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="py-4 px-6">
                            <MobileMenu
                                linksData={LinksData}
                                onLinkClick={toggleMobileMenu}
                            />
                            {/* <div className="my-8 border-t border-gray-200"></div> */}
                            {/* <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">
                                    Follow Us
                                </h3>
                                <div className="flex gap-3">
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.876.876 1.366 2.027 1.366 3.324s-.49 2.448-1.366 3.323c-.875.876-2.026 1.366-3.323 1.366zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.876-.875-1.366-2.026-1.366-3.323s.49-2.448 1.366-3.323c.875-.876 2.026-1.366 3.323-1.366s2.448.49 3.323 1.366c.876.875 1.366 2.026 1.366 3.323s-.49 2.448-1.366 3.323c-.875.876-2.026 1.366-3.323 1.366z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-gray-800 text-white transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://youtube.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </a>
                                </div>
                            </div> */}
                        </div>
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
