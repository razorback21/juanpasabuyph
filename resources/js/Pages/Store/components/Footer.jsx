import { Link } from "@inertiajs/react";
import Logo from "./Logo";

export default function Footer() {
    const links = [
        {
            name: "About Us",
            href: "/about",
        },
        {
            name: "Contact Us",
            href: "/contact",
        },
        {
            name: "Privacy Policy",
            href: "/privacy-policy",
        },
        {
            name: "Terms of Service",
            href: "/terms-of-service",
        },
    ];

    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="max-w-screen-xl mx-auto px-5 py-12 @container">
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-2">
                        <Logo />
                        <p className="text-sm wrap-break-word mt-4 text-justify max-w-md">
                            Your one-stop shop for finding the best products{" "}
                            from various malls and retailers in Dubai, all in{" "}
                            one place.
                        </p>{" "}
                    </div>
                    {/* <div>
                        <h4 className="text-white text-base font-semibold mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    className="hover:text-red-500 transition-colors text-sm"
                                    href="#"
                                >
                                    Store
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-red-500 transition-colors text-sm"
                                    href="#"
                                >
                                    Stores
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-red-500 transition-colors text-sm"
                                    href="#"
                                >
                                    New Arrivals
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-red-500 transition-colors text-sm"
                                    href="#"
                                >
                                    Featured Products
                                </a>
                            </li>
                        </ul>
                    </div> */}
                    <div>
                        <h4 className="text-white text-base font-semibold mb-4">
                            Information
                        </h4>
                        <ul className="space-y-2">
                            {links.map((link) => {
                                return (
                                    <li key={link.href}>
                                        <Link
                                            className="hover:text-red-500 transition-colors text-sm"
                                            href={link.href}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-white text-base font-semibold mb-4">
                            Follow Us
                        </h5>
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
                <div className="border-t border-gray-700 pt-8 text-center">
                    <p className="text-sm">
                        © 2025 JuanPasabuy PH. All rights reserved. Designed and
                        developed by{" "}
                        <a
                            href="https://www.donnygapulao.site"
                            className="text-red-500 hover:underline"
                        >
                            Donny Gapulao
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
