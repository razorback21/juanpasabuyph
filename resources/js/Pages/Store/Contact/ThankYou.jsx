import { Link } from "@inertiajs/react";
import Layout from "../components/Layout";

export default function () {
    return (
        <Layout title="Thank You">
            <div className="container mx-auto">
                <div className="text-center space-y-6">
                    <div className="inline-block p-5 bg-gray-200 rounded-full">
                        <svg
                            className="text-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-mail-icon lucide-mail"
                        >
                            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                        </svg>
                    </div>
                    <h1 className="tracking-tight text-4xl md:text-5xl font-bold leading-tight">
                        Thank you for your message!
                    </h1>
                    <p className="tetext-lg font-normal leading-relaxed max-w-md mx-auto">
                        We have received your message and will get back to you
                        as soon as possible.
                    </p>
                    <div className="flex justify-center">
                        <Link href={route("catalog")}>
                            <button
                                className="flex md:w-auto min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-sm h-12 px-6 bg-red-600 hover:bg-red-700 text-white text-base font-semibold leading-normal tracking-[0.015em] transition-colors shadow-sm hover:shadow-md"
                                type="submit"
                            >
                                <span className="truncate">
                                    Back to catalog
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
