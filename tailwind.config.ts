import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      primary: {
        100: "rgb(var(--color-primary-a1) / <alpha-value>)",
      },
      secondary: {
        100: "rgb(var(--color-secondary-a1) / <alpha-value>)",
        200: "rgb(var(--color-secondary-a2) / <alpha-value>)",
        300: "rgb(var(--color-secondary-a3) / <alpha-value>)",
      },
      tertiary: {
        100: "rgb(var(--color-tertiary-a1) / <alpha-value>)",
        200: "rgb(var(--color-tertiary-a2) / <alpha-value>)",
      },
      custom: "#f0b4b4",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto)"],
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        9.5: "2.375rem",
      },
      "translate-50": 'transform: "translate(-50%, -50%)"',
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".header-link": {
          fontFamily: "var(--font-roboto) !important",
          fontSize: "1.125rem !important",
          fontWeight: "400 !important",
          lineHeight: "150% !important",
        },

        ".main-title": {
          fontFamily: "var(--font-inter) !important",
          fontSize: "3rem !important",
          fontWeight: "400 !important",
          lineHeight: "150% !important",
        },
        ".title": {
          fontFamily: "var(--font-inter) !important",
          fontSize: "1.5rem !important",
          fontWeight: "400 !important",
          lineHeight: "130% !important",
        },
        ".main-text": {
          fontFamily: "var(--open-roboto) !important",
          fontSize: "1rem !important",
          fontWeight: "400 !important",
          lineHeight: "150% !important",
        },
        ".sub-text": {
          fontFamily: "var(--open-roboto) !important",
          fontSize: "0.875rem !important",
          fontWeight: "400 !important",
          lineHeight: "150% !important",
        },
        ".translate-50": {
          transform: "translate(-50%, -50%)",
        },
      });
    }),
  ],
} satisfies Config;
