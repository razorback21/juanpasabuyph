import { forwardRef, useState, useImperativeHandle } from "react";
import MobileMenuItems from "./MobileMenuItems";
import Logo from "./Logo";
import FacebookButton from "./FacebookButton";

const MobileMenu = forwardRef(({ linksData }, ref) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        toggleMobileMenu: () => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
        },
    }));

    return (
        <>
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => ref.current.toggleMobileMenu()}
                />
            )}

            {/* Mobile Menu Sidebar */}
            <div
                className={`bg-white lg:hidden fixed top-0 left-0 h-full w-80 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                id="mobile-menu"
            >
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <Logo />
                        <button
                            onClick={() => ref.current.toggleMobileMenu()}
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
                    {/* <div className="mt-5 border-t border-gray-200"></div> */}
                </div>
                <div className="py-4 px-6">
                    <MobileMenuItems linksData={linksData} />
                    {/* <div className="my-10 border-t border-gray-200"></div> */}
                    <div className="mt-7">
                        <p className="text-gray-500 mb-2 text-sm font-light">
                            Follow us on:
                        </p>
                        <a
                            href="https://www.facebook.com/juanonlinecart/"
                            className="inline-flex items-center px-6 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe0] transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg
                                className="w-6 h-6 mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                    Facebook
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
});

export default MobileMenu;
