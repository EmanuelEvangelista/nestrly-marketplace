/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        "70/30": "70% 30%",
      },
      colors: {
        brandRed: "#e63946",
        brandBlue: "#1d3557",
      },
    },
  },
  plugins: [],
};
