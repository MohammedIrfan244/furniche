/** @type {import('tailwindcss').Config} */
import scrollbarPlugin from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      oswald: ['Oswald', 'sans-serif']
    }},
  },
  plugins: [
    scrollbarPlugin, // Use the imported plugin here
  ],
}