/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}', './app/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'jcc-navy': {
          DEFAULT: '#1a365d',
          light: '#284c78',
        },
        'jcc-gold': {
          DEFAULT: '#f5b82e',
          light: '#ffd166',
          dark: '#d89b12',
        },
        'jcc-orange': '#f97316',
        'jcc-cream': {
          DEFAULT: '#fffaf0',
          dark: '#f3ead7',
        },
        'jcc-green': {
          DEFAULT: '#0f5132',
          light: '#176b43',
        },
        'jcc-language': '#1a365d',
        'jcc-logo': '#1a365d',
        'jcc-online': '#dc2626',
      },
      fontFamily: {
        anton: ['Anton', 'Impact', 'sans-serif'],
        heading: ['Montserrat', 'Arial', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        gradient: 'gradient 6s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
