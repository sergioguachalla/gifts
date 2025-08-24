/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { blush: "#fff1f2" },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: { soft: "0 10px 25px rgba(0,0,0,0.06)" },
    },
  },
  plugins: [],
};
