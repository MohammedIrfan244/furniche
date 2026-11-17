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
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        oswald: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        poppins: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Luxury Atelier Palette
        canvas: {
          DEFAULT: '#FAF9F6',
          subtle: '#F5F3EF',
          card: '#FFFFFF',
          muted: '#ECEAE4',
        },
        obsidian: {
          DEFAULT: '#171615',
          light: '#2B2927',
          muted: '#6E6B65',
          faint: '#9C9890',
        },
        champagne: {
          DEFAULT: '#C2A676',
          hover: '#AB8E5E',
          light: '#E8DEC8',
          faint: '#F9F6F0',
        },
        atelier: {
          DEFAULT: '#1C2024',
          dark: '#111417',
          border: '#E7E4DE',
        },
        // Harmonized overrides for backward compatibility
        black: '#171615',
        white: '#FFFFFF',
        gold: '#C2A676',
        sofaBlue: '#171615',
      },
      boxShadow: {
        'atelier': 'none',
        'atelier-hover': 'none',
        'atelier-lg': '0 4px 20px -2px rgba(23, 22, 21, 0.04)',
      },
      letterSpacing: {
        'luxury': '0.2em',
        'luxury-wide': '0.3em',
      },
    },
  },
  plugins: [
    scrollbarPlugin,
  ],
};
