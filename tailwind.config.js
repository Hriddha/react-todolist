/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        '3xl':'2560px'
      },
      height:{
        '120':'60dvh'
      }
    },
  },
  plugins: [],
}