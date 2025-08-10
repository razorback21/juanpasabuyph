import { Head } from "@inertiajs/react";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function Layout({ title, children }) {
    return (
        <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <Head title={title}>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <meta name="theme-color" content="#e92933" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="default"
                    />
                    <meta name="format-detection" content="telephone=no" />
                    <link rel="preconnect" href="https://fonts.bunny.net" />
                    <link rel="dns-prefetch" href="https://fonts.bunny.net" />
                    <link
                        rel="preload"
                        href="/storage/assets/pdala_hero_bg.png"
                        as="image"
                    />
                </Head>
                <Navigation />
                <main className="sm:px-6 lg:px-10 xl:px-20 2xl:px-40 flex flex-1 py-8 bg-gray-50">
                    <div className="px-4 flex flex-1 justify-center py-2 md:py-8">
                        <div className="layout-content-container flex flex-col max-w-screen-xl flex-1">
                            {children}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}
