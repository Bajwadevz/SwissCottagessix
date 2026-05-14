import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        "line-2": "var(--line-2)",
        ink: "var(--ink)",
        "ink-mute": "var(--ink-mute)",
        "ink-dim": "var(--ink-dim)",
        brass: "var(--brass)",
        "brass-2": "var(--brass-2)",
        pine: "var(--pine)",
        rose: "var(--rose)",
        trust: "var(--trust)",
        "glass-bg": "var(--glass-bg)",
        "glass-bd": "var(--glass-bd)",
        "glass-strong": "var(--glass-bg-strong)",
      },
      fontFamily: {
        display: ["var(--f-display)", "serif"],
        sans: ["var(--f-ui)", "system-ui", "sans-serif"],
        mono: ["var(--f-mono)", "monospace"],
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
        pill: "999px",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        spring: "var(--ease-spring)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.8" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-speed, 60s) linear infinite",
        "fade-up": "fadeUp 900ms var(--ease-out) both",
        "pulse-ring": "pulse-ring 2.4s var(--ease-out) infinite",
        "pulse-dot": "pulse-dot 1.8s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
