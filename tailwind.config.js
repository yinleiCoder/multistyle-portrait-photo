/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: '#000',
        'hover-main':'#f32836'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
