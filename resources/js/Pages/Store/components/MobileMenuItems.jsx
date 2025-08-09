import { usePage } from "@inertiajs/react";

export default function ({ linksData }) {
    const page = usePage();
    function highlightActiveLink(component) {
        if (page.component === component) {
            return "text-red-600 font-bold";
        } else {
            return "text-gray-500 font-bold";
        }
    }

    return (
        <nav className="flex flex-col gap-4 ">
            {linksData.map((link, index) => (
                <a
                    key={index}
                    className={`${highlightActiveLink(
                        link.component
                    )} hover:text-red-600 hover:underline`}
                    href={link.href}
                >
                    {link.name}
                </a>
            ))}
        </nav>
    );
}
