import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./setupTests.ts",
        clearMocks: true,
        css: true,
        reporters: ["verbose"],
        coverage: {
            reporter: ["text", "json", "html"],
            include: ["src/**/*"],
            exclude: [],
        },
    },
});
