/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fredoka', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '475px',
        ...defaultTheme.screens,
      },
      typography: {
        DEFAULT: {
          css: [],
        },
        dark: {
          css: [],
        },
        light: {
          css: [],
        },
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
