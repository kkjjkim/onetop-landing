/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Navy Blue Theme
        'navy': {
          700: '#1e3a5f',
          800: '#172a45',
          900: '#0d1b2a',
          950: '#091521',
        },
        // Gold Accent
        'gold': {
          400: '#e0c068',
          500: '#d4af37',
          600: '#b8992e',
        },
        // Existing colors (for backwards compatibility)
        primary: {
          DEFAULT: '#0F172A',
          light: '#334155',
          dark: '#020617',
        },
        brand: {
          DEFAULT: '#0055FF',
          hover: '#0044CC',
          light: '#E5EDFF',
        },
        accent: {
          DEFAULT: '#FF3B30',
          orange: '#FF9500',
        },
        background: '#F8FAFC',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scroll': 'scroll 30s linear infinite',
        'blob': 'blob 7s infinite',
        'shimmer': 'shimmer 1s infinite',
        'pulse': 'pulse 10s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.33%)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(200%) skewX(-12deg)' },
        },
      },
    },
  },
  plugins: [],
}
