import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7f7',
          100: '#d5ecec',
          200: '#aed9da',
          300: '#7fc0c2',
          400: '#4a9b9e',
          500: '#3a7d80',
          600: '#2f6466',
          700: '#284f51',
          800: '#1e3c3d',
          900: '#162b2c',
        },
      },
    },
  },
  plugins: [],
}

export default config
