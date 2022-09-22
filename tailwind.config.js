/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    screens: {
      'sm': '560px',
      'md': '992px',
      'lg': '1200px'
    },
    extend: {
      boxShadow: {
        'window': 'inset -1px -1px #0a0a0a,inset 1px 1px #dfdfdf,inset -2px -2px grey,inset 2px 2px #fff'
      },
      fontFamily: {
        ms: 'Pixelated MS Sans Serif'
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(300px, 1fr))'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
