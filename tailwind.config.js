/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: '#000',
        'second': '#08dfad',
        'hover-main':'#08dfad'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
