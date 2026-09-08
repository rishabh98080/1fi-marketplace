/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#8B2CF5',
          700: '#6222E4', // 1Fi Signature Purple
          800: '#5019C3',
          900: '#3B128F',
          950: '#23085C',
        },
        'fi-purple': {
          DEFAULT: '#6222E4',
          dark: '#5019C3',
          light: '#F4F0FD',
          surface: '#F8F6FE',
          border: '#E8E1FB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'fi-card': '0 4px 20px -2px rgba(98, 34, 228, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'fi-elevated': '0 12px 32px -4px rgba(98, 34, 228, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'fi-glow': '0 0 24px rgba(98, 34, 228, 0.25)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      }
    },
  },
  plugins: [],
}
