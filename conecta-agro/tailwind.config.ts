import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        agro: {
          50: "#f0f9f0",
          100: "#dcf1dd",
          200: "#b9e2bb",
          300: "#8ccd90",
          400: "#5bb162",
          500: "#3a9642",
          600: "#2c7a33",
          700: "#1f5c26", // primary brand green
          800: "#164a1d",
          900: "#0f3a15",
        },
        sky: {
          soil: "#8b5e34",
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 2px 10px rgba(15, 58, 21, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
