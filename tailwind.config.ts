import {type Config} from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        business: '#fffff0',
        cs: '#512bd4',
        cpp: '#00599c',
        c: '#a8b9cc',
        css: '#1572b6',
        default: '#ecebff',
        docker: '#2497ed',
        go: '#00add8',
        html: '#e34f26',
        java: '#f89820',
        javascript: '#f7df1e',
        kotlin: '#7f52ff',
        node: '#44883e',
        philosophy: '#ffdfb6',
        php: '#777bb4',
        politics: '#ff7f50',
        programming: '#ff3344',
        python: '#3776ab',
        react: '#222',
        religion: '#6a5acd',
        ruby: '#cc342d',
        rust: '#ce422b',
        science: '#f9a8d4',
        shell: '#4eaa25',
        swift: '#fa7343',
        typescript: '#3178c6',
      },
      fontFamily: {
        sans: ['Fredoka'],
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [],
} satisfies Config
