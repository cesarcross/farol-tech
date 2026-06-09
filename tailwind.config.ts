import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        brand: {
          amber: "#F5A623",
          "amber-light": "#FFD07A",
          "amber-dark": "#C07D0A",
        },
        surface: {
          0: "#0A0A0A",
          1: "#111111",
          2: "#1A1A1A",
          3: "#242424",
          4: "#2E2E2E",
        },
        ink: {
          primary: "#F5F0E8",
          secondary: "#A8A090",
          muted: "#5C5650",
        },
      },
      letterSpacing: {
        widest2: "0.2em",
        widest3: "0.3em",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "beacon-pulse": "beaconPulse 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        beaconPulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
