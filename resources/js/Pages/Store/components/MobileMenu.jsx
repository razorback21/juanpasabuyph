export default function ({ linksData }) {
    return (
        <nav className="flex flex-col gap-4">
            {linksData.map((link) => (
                <a
                    className="text-[#4b5563] hover:text-[#e92933] text-sm font-medium leading-normal transition-colors py-2"
                    href={link.href}
                >
                    {link.name}
                </a>
            ))}
            <label className="relative flex-col min-w-0 !h-10 max-w-xs mt-2 lg:hidden">
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
                    placeholder="ORD-XXX-XXXXX"
                    defaultValue=""
                />
            </label>
        </nav>
    );
}
