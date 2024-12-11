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
      },
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        gold: '#FFD700', // Standard gold
        goldenWood: '#D4A017', // Warm wood-like golden color
      },
    },
  },
  plugins: [
    scrollbarPlugin, // Use the imported plugin here
  ],
};

