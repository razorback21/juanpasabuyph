import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        host: "juanpasabuyph.loc",
        port: 5173,
        strictPort: true,
        origin: "http://juanpasabuyph.loc:5173",
        cors: true,
        hmr: {
            port: 5173,
            host: "localhost",
        },
    },
    // server: {
    //     host: true,
    //     port: 5173,
    // },
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            ssr: "resources/js/ssr.jsx",
            refresh: true,
        }),
        react(),
    ],
});
