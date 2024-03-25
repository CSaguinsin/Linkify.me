/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter Bold"],
      },

      colors: {
        orange: '#FF914D',
      },
    },
  },
  plugins: [require("daisyui")],
}
