import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ca: {
          bg: "var(--ca-bg)",
          surface: "var(--ca-surface)",
          surface2: "var(--ca-surface2)",
          border: "var(--ca-border)",
          border2: "var(--ca-border2)",
          text: "var(--ca-text)",
          "text-secondary": "var(--ca-text-secondary)",
          "text-dim": "var(--ca-text-dim)",
          blue: "var(--ca-blue)",
          "blue-light": "var(--ca-blue-light)",
          "blue-dim": "var(--ca-blue-dim)",
          amber: "var(--ca-amber)",
          "on-accent": "var(--ca-on-accent)",
        },
      },
      borderRadius: {
        ca: "var(--ca-radius)",
        card: "var(--ca-radius-card)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
