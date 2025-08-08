import { useEffect, useRef, useState } from "react";
import { Head } from "@inertiajs/react";
import Footer from "./Footer";
import Logo from "./Logo";
import { Link, usePage, router } from "@inertiajs/react";
import NavLink from "../components/NavLinks";
import MobileMenu from "../components/MobileMenu";

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
    const page = usePage();
    const props = usePage().props;
    const trackRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (trackRef.current) {
            trackRef.current.focus();
        }
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    function handleOrderTracking(e) {
        router.get(route("track", { order_id: trackRef.current.value }));
    }

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <Head title={title}>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <meta name="theme-color" content="#e92933" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="default"
                    />
                    <meta name="format-detection" content="telephone=no" />
                    <link rel="preconnect" href="https://fonts.bunny.net" />
                    <link rel="dns-prefetch" href="https://fonts.bunny.net" />
                    <link
                        rel="preload"
                        href="/storage/assets/pdala_hero_bg.png"
                        as="image"
                    />
                </Head>
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
                            {page.component !== "Store/Track/NotFound" && (
                                <>
                                    <div className="hidden md:flex">
                                        <div className="relative flex">
                                            <input
                                                type="text"
                                                className="h-10 w-[280px] rounded-lg border-1 border-[#d1d5db] bg-white pl-10 pr-[80px] text-sm text-gray-600 font-extrabold placeholder:font-normal placeholder:text-gray-400 focus:outline-none transition-colors"
                                                placeholder="Enter tracking number"
                                                defaultValue=""
                                                ref={trackRef}
                                            />
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                                                </svg>
                                            </div>
                                            <button
                                                onClick={handleOrderTracking}
                                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-4 rounded-lg border border-[#e92933] bg-[#e92933] hover:bg-[#d41e27] text-white transition-colors flex items-center justify-center"
                                            >
                                                Track
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
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
                        className={`lg:hidden fixed top-0 left-0 h-full w-80 shadow-lg z-50 transform transition-transform duration-300 ease-in-out bg-gray-900 ${
                            isMobileMenuOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }`}
                        id="mobile-menu"
                    >
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <Logo />
                                <button
                                    onClick={toggleMobileMenu}
                                    className="flex items-center justify-center rounded-lg h-7 w-7 ml-1 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
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
                            <div className="mt-5 border-t border-gray-700"></div>
                        </div>
                        <div className="py-4 px-6">
                            <MobileMenu
                                linksData={LinksData}
                                onLinkClick={toggleMobileMenu}
                            />
                            <div className="mt-8 mb-6 border-t border-gray-700"></div>
                            <div>
                                <h4 className="text-white text-base font-semibold mb-4">
                                    Follow Us
                                </h4>
                                <div className="flex space-x-4">
                                    <a
                                        aria-label="Twitter"
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        href="#"
                                    >
                                        <svg
                                            fill="currentColor"
                                            height="24"
                                            width="24"
                                            viewBox="0 0 256 256"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z" />
                                        </svg>
                                    </a>
                                    <a
                                        aria-label="Instagram"
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        href="#"
                                    >
                                        <svg
                                            fill="currentColor"
                                            height="24"
                                            width="24"
                                            viewBox="0 0 256 256"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
                                        </svg>
                                    </a>
                                    <a
                                        aria-label="Facebook"
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        href="#"
                                    >
                                        <svg
                                            fill="currentColor"
                                            height="24"
                                            width="24"
                                            viewBox="0 0 256 256"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="sm:px-6 lg:px-10 xl:px-20 2xl:px-40 flex flex-1 py-8 bg-gray-50">
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
