/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta azul suave que ya tienes
        azure: {
          50:  "#f6fbff",
          100: "#eaf4ff",
          200: "#d6eaff",
          300: "#b9dbff",
          400: "#8fc5ff",
          500: "#63afff",
          600: "#428fe6",
          700: "#2f72c2",
          800: "#285d9d",
          900: "#224c80",
        },
        // Paleta rosada suave para fondos y bordes
        blush: {
          50:  "#fff1f5",
          100: "#ffe4ec",
          200: "#ffcfe0",
          300: "#ffb7cf",
          400: "#ff9fbe",
          500: "#f471a6",
          600: "#e05991",
          700: "#be4a77",
          800: "#9d3c62",
          900: "#7d314f",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 25px -10px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};
