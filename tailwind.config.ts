import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0D0D0D",
        bone: "#F0EDE6",
        gold: "#C9A84C",
        crimson: "#8B1A1A",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 40px rgba(201, 168, 76, 0.35)",
        "gold-strong": "0 0 60px rgba(201, 168, 76, 0.6)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(10px, -10px) rotate(5deg)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        drift: "drift 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
