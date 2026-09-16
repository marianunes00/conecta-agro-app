import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        agro: {
          50: "#f1f8f3",
          100: "#def0e2",
          200: "#bfe2c8",
          300: "#93cca2",
          400: "#62b078",
          500: "#3d9556",
          600: "#2c7842",
          700: "#1b5e20", // primary brand forest green
          800: "#164e1c",
          900: "#124017",
          950: "#08230b",
        },
        sky: {
          soil: "#8b5e34",
        },
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 12px -2px rgba(22, 78, 28, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03)",
        "card-hover": "0 8px 24px -4px rgba(27, 94, 32, 0.12)",
        subtle: "0 1px 3px rgba(0, 0, 0, 0.04)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
