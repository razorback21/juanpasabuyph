import { Link } from "@inertiajs/react";
import Logo from "./Logo";
import FacebookButton from "./FacebookButton";

export default function Footer() {
    const links = [
        {
            name: "About Us",
            href: "/about",
            route: "about",
        },
        {
            name: "Contact Us",
            href: "/contact",
            route: "contact",
        },
        {
            name: "Privacy Policy",
            href: "/privacy-policy",
            route: "privacy-policy",
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
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white text-base font-semibold mb-4">
                            Information
                        </h4>
                        <ul className="space-y-2">
                            {links.map((link) => {
                                return (
                                    <li key={link.route}>
                                        <Link
                                            className="hover:text-red-500 transition-colors text-sm"
                                            href={link.href}
                                            route={link.route}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div>
                        <div className="flex space-x-4">
                            <FacebookButton />
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
