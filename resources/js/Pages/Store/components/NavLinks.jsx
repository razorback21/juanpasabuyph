import MenuItems from "./MenuItems";

export default function NavLinks({ linksData }) {
    return (
        <nav className="hidden lg:flex items-center gap-6">
            {linksData.map((link) => (
                <MenuItems key={link.href} link={link} />
            ))}
        </nav>
    );
}
