/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'forest-green': '#2d5016',
        'leaf-green': '#4a7c2f',
        'mint-green': '#7fb069',
        'sage': '#a8c686',
        'earth-brown': '#8b7355',
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
        'body': ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
