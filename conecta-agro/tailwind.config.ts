import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          institucional: "#174807", // Logo, títulos e elementos principais
          conecta: "#496F3C", // Gráficos, ícones e botões secundários
          medio: "#738C69", // Elementos complementares e apoio
          salvia: "#8FA787", // Fundos, cards e áreas secundárias
          cinza: "#D4DDD1", // Bordas, divisórias e fundos suaves
          escuro: "#123A08", // Textos fortes e alto contraste
          branco: "#FFFFFF",
        },
        agro: {
          50: "#f4f7f2",
          100: "#e4ede1",
          200: "#c8dcc3",
          300: "#adcba7",
          400: "#8FA787", // Verde Sálvia
          500: "#738C69", // Verde Médio
          600: "#496F3C", // Verde Conecta
          700: "#2b5c1a",
          800: "#174807", // Verde Institucional
          900: "#123A08", // Verde Escuro
          950: "#092004",
        },
        sky: {
          soil: "#8b5e34",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        heading: ["var(--font-poppins)", "Poppins", "sans-serif"],
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 14px -2px rgba(23, 72, 7, 0.07), 0 1px 4px rgba(0, 0, 0, 0.03)",
        "card-hover": "0 8px 24px -4px rgba(23, 72, 7, 0.14)",
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
