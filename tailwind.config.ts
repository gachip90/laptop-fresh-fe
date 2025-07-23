/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        orange: {
          100: "#fff3e0",
          200: "#ffe0b2",
          300: "#ffcc80",
          400: "#ffb74d",
          500: "#fa8c16",
          600: "#e07b12",
          700: "#c66a0e",
          800: "#ac590a",
          900: "#924806",
        },
        blue: {
          100: "#e6f0ff",
          200: "#b3d4ff",
          300: "#80b8ff",
          400: "#4d9bff",
          500: "#1677ff",
          600: "#1261cc",
          700: "#0e4b99",
          800: "#0a3666",
          900: "#072033",
        },
      },
    },
  },
  plugins: [],
};
