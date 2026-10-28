/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pastel: {
          50: '#F4FAF7',
          100: '#E6F6EF',
          200: '#D4EDDA',
          300: '#A8E6CF',
          400: '#7CD1B1',
          500: '#4EBA92',
          600: '#349A74',
          700: '#267759',
          800: '#1B5640',
          900: '#12392B',
        },
        sage: {
          50: '#F6F7F5',
          100: '#EDF0EB',
          200: '#DDE2D8',
          300: '#C2CCC0',
          400: '#9EAD9B',
          500: '#7A8C77',
          600: '#5F6F5C',
          700: '#495547',
          800: '#363E35',
          900: '#232822',
        },
        cream: {
          50: '#FDFAF4',
          100: '#FAF3E3',
          200: '#F5E6C7',
          300: '#EDD3A3',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(168, 230, 207, 0.25)',
        'card': '0 2px 12px 0 rgba(0, 0, 0, 0.04), 0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        'elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      }
    },
  },
  plugins: [],
}
