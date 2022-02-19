// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        // colors: {},
        extend: {
            spacing: {
                '5vw': '5vw',
            },
        },
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
