import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#FF6A00",
          light: "#FF8533",
          dark: "#E55D00",
        },
        black: {
          DEFAULT: "#121212",
          soft: "#1A1A1A",
        },
        gray: {
          light: "#F5F5F5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        "drone": "drone 20s ease-in-out infinite",
        "slide": "slide 30s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        drone: {
          "0%, 100%": { transform: "translateX(0) translateY(0) scale(1)" },
          "25%": { transform: "translateX(10px) translateY(-5px) scale(1.02)" },
          "50%": { transform: "translateX(0) translateY(-10px) scale(1.05)" },
          "75%": { transform: "translateX(-10px) translateY(-5px) scale(1.02)" },
        },
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 106, 0, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 106, 0, 0.6)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
