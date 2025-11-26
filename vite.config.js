import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "/admin/",
    server: {
        host: true,
        allowedHosts: [
            'ff2ba49fee60.ngrok-free.app'
        ]
    },
    build: {
        target: "esnext", // Use modern JS
        minify: "esbuild", // Faster + smaller than terser
        cssCodeSplit: true, // Load CSS per chunk
        chunkSizeWarningLimit: 500, // Avoid large chunk warnings
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return id
                            .toString()
                            .split("node_modules/")[1]
                            .split("/")[0]
                            .toString();
                    }
                },
            },
        },
    },
});
