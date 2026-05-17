/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf9ee',
          100: '#f9f0d0',
          200: '#f2dc9b',
          300: '#e8c55e',
          400: '#dfad32',
          500: '#c9941c',
          600: '#b07515',
          700: '#8c5614',
          800: '#744517',
          900: '#623918',
        },
        luxury: {
          black: '#0a0a0a',
          dark: '#111111',
          card: '#1a1a1a',
          border: '#2a2a2a',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}
