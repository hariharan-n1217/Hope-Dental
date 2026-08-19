/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#06101a',
          800: '#0c1d2d',
          700: '#112538',
          600: '#1a334b',
        },
        tealBrand: {
          50: '#f0fdfa',
          100: '#e6f7f5',
          200: '#c5ece6',
          300: '#90dcd0',
          500: '#0d8a7b',
          600: '#0a7265',
          700: '#085a50',
        },
        mintCard: '#f3f9f8',
        mintBadge: '#d4eee9',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}