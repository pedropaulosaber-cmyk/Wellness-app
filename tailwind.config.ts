import type { Config } from "tailwindcss";

/**
 * Tema do Vivá — branco e verde wellness.
 * Verde da marca: #1F6B4A (usado no manifest/PWA e nos CTAs).
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        viva: {
          // Verde principal da marca
          DEFAULT: "#1F6B4A",
          50: "#EAF5EF",
          100: "#D3EBDF",
          200: "#A8D7BF",
          300: "#7CC29E",
          400: "#4F9E78",
          500: "#1F6B4A", // marca
          600: "#195840",
          700: "#134534",
          800: "#0D3226",
          900: "#071F18",
          // Acentos de apoio
          mint: "#7CC29E",
          cream: "#F7FBF8", // fundo levemente esverdeado
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
