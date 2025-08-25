/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta azul suave y romántica
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
