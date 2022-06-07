module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './lib/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
        fontFamily: {
            primary: ['Roboto', 'sans-serif'],
            secondary: ['Maven Pro', 'sans-serif'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
