/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blackMain: '#121212',
        semiWhite: '#B3B3B3',
        secondaryBlack: '#242424'
      }
    },
  },
  plugins: [],
}

