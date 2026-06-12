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
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        charcoal: "#1a1a1a",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-med": "float 6s ease-in-out infinite 1s",
        shimmer: "shimmer 2s linear infinite",
        "pulse-green": "pulse-green 2s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-green": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(34,197,94,0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(34,197,94,0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "green-glow": "radial-gradient(ellipse at center, rgba(34,197,94,0.15) 0%, transparent 70%)",
        "hero-grid":
          "linear-gradient(rgba(34,197,94,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.07) 1px, transparent 1px)",
      },
      backgroundSize: {
        "hero-grid": "40px 40px",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#374151",
            maxWidth: "none",
            a: { color: "#22c55e", textDecorationColor: "#22c55e", "&:hover": { color: "#16a34a" } },
            "h1,h2,h3,h4": { fontFamily: "'Space Grotesk', sans-serif", color: "#0f1a0f" },
            strong: { color: "#0f1a0f" },
            code: { color: "#15803d", backgroundColor: "#f0fdf4", padding: "2px 6px", borderRadius: "4px", fontWeight: "600" },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            blockquote: {
              borderLeftColor: "#22c55e",
              backgroundColor: "#f0fdf4",
              padding: "1rem 1.5rem",
              borderRadius: "0 8px 8px 0",
              fontStyle: "normal",
              color: "#374151",
            },
            "blockquote p:first-of-type::before": { content: '""' },
            "blockquote p:last-of-type::after": { content: '""' },
            "ul > li::marker": { color: "#22c55e" },
            "ol > li::marker": { color: "#22c55e" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
