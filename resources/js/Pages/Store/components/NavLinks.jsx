import { Link, usePage } from "@inertiajs/react";

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

export default function () {
    const page = usePage();
    console.log(page);

    function activeClass(link) {
        return page.component === link.component
            ? "text-[#e92933]"
            : "text-[#4b5563]";
    }

    function HeadLink({ link }) {
        return (
            <Link
                as="button"
                disabled={link.component === page.component}
                className={`${activeClass(
                    link
                )} relative text-sm font-medium leading-normal transition-all duration-300 hover:text-[#e92933] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-[#e92933] before:transition-all before:duration-300 hover:before:w-full`}
                href={link.href}
            >
                {link.name}
            </Link>
        );
    }

    return (
        <nav className="hidden lg:flex items-center gap-6">
            {LinksData.map((link) => (
                <HeadLink key={link.href} link={link} />
            ))}
        </nav>
    );
}
