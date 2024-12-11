/** @type {import('tailwindcss').Config} */
import scrollbarPlugin from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        gold: '#FFD700',
        sofaBlue: '#112558',
      },
    },
  },
  plugins: [
    scrollbarPlugin,
  ],
};
