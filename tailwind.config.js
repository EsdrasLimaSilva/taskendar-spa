/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                neutral: {
                    50: "#FFFFFF",
                    100: "#FAFBFF",
                    200: "#EDEFF7",
                    300: "#B2B8CC",
                    400: "#46445F",
                    500: "#1E1D35",
                    600: "#060B1D",
                },

                primary: {
                    100: "#F5F6FF",
                    200: "#CCD4FF",
                    300: "#A5B4FD",
                    400: "#4F69EE",
                    500: "#2040DF",
                    600: "#0F1842",
                },
            },
        },
    },
    plugins: [],
};
