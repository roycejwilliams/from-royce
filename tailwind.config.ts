import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'reveal', 
  ],
  theme: {
    extend: {
      fontFamily: {
        cylburn: ['Cylburn', 'cursive'],
        anonymous: ['Anonymous Pro Minus B', 'monospace'],
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
} satisfies Config;
