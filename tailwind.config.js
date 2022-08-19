/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
