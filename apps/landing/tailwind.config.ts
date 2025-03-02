import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/**/**/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(150, 60%, 40%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        secondary: {
          DEFAULT: "hsl(170, 50%, 45%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        muted: {
          DEFAULT: "hsl(150, 20%, 96%)",
          foreground: "hsl(150, 20%, 40%)",
        },
        accent: {
          DEFAULT: "hsl(150, 40%, 95%)",
          foreground: "hsl(150, 60%, 40%)",
        },
        custom: {
          gradient1: "hsl(150, 60%, 40%)",
          gradient2: "hsl(170, 50%, 45%)",
          soft: "hsl(150, 60%, 97%)",
          dark: "hsl(150, 30%, 20%)",
          light: "hsl(150, 40%, 90%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
