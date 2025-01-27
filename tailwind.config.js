/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom-light-green': '#C1E899',
        'custom-brown' : '#9A6735',
        'custom-offwhite': '#E6F0DC',
        'custom-dark-green': '#55883B',
      },
      fontFamily: {
        'heading': ["Oswald", 'sans-serif'],
        'content': ["Lato", 'sans-serif'],
      },
    },
  },
  plugins: [],
}

