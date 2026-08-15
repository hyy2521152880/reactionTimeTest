import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"]
      },
      colors: {
        ink: "#111820",
        paper: "#f5f7f8",
        line: "#dfe5e8",
        action: "#2864dc",
        signal: "#00a86b",
        caution: "#e1534f",
        marker: "#ffcc4d"
      },
      boxShadow: {
        console: "0 24px 70px rgba(17, 24, 32, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
