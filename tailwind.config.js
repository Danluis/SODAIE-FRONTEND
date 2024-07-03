/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '95vh': '95vh',
        '70vh': '70vh'
      },
      colors:{
        blackMain: '#0F0F0F',
        semiWhite: '#B3B3B3',
        secondaryBlack: '#242424',
        blackLogo: '#292929',
        semiBlack: '#1E293B'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}

