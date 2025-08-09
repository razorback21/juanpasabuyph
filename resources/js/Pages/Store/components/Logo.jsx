export default function Logo() {
    return (
        <div>
            <h2 className="flex text-[#111827] text-xl font-extrabold leading-tight tracking-[-0.015em]">
                <span className="flex bg-[#e92933] text-white px-3 py-2 rounded-tl-xl inline-block">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                        <path d="M12 22V12" />
                        <polyline points="3.29 7 12 12 20.71 7" />
                        <path d="m7.5 4.27 9 5.15" />
                    </svg>

                    <span className="ml-2">JUAN</span>
                </span>
                <span className="bg-[#2c29e9] text-white px-3 py-2 rounded-br-xl inline-block">
                    PASABUY<span className="text-[#e3dd64]">PH</span>
                </span>
            </h2>
        </div>
    );
}
