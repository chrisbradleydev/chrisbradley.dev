// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    theme: {
        // colors: {},
        // extend: {},
        // screens: {},
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/typography'),
    ],
};
