/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-1': '#333',
        'black-1': '#1A1A1A',
        'red-1': '#D52E38',
        'red-2': '#b81c25'
      }
    },
  },
  plugins: [],
}