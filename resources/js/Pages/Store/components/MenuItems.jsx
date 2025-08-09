import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

export default function MenuItems({ link }) {
    const page = usePage();
    function activeClass(link) {
        return page.component === link.component
            ? "text-[#e92933]"
            : "text-[#4b5563]";
    }

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
