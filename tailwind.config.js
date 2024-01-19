const { fontFamily } = require('tailwindcss/defaultTheme')


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    animation: {
      'home-gradient': 'home-gradient 11s linear infinite',
      'flash': 'flash 1s linear 1 forwards',
    },
    screens:{
      'mobile': '300px',
      'tablet': '640px',
      'md': '800px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
  },
  plugins: [
    
  ],
}