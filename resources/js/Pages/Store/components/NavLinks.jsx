import MenuItems from "./MenuItems";

export default function ({ LinksData }) {
    return (
        <nav className="hidden lg:flex items-center gap-6">
            {LinksData.map((link) => (
                <MenuItems key={link.href} link={link} />
            ))}
        </nav>
    );
}
