/** @type {import('tailwindcss').Config} */

module.exports ={
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  
  future: {
    variantGrouping: true,
  },
  theme: {
    extend: {
      colors: {
        pageBackground: 'var(--colors-background)',
        
        themedButtonBackground: 'var(--colors-buttonBackground)',
        themedButtonText: `var(--colors-buttonText)`,
        themedFooterBackground: `var(--colors-footerBackground)`,
        themedGithubLink: 'var(--colors-githubLink, #f0f6fc)',
        themedHamburgerBackground: 'var(--colors-hamburgerBackground)',
        themedHeaderBackground: 'var(--colors-headerBackground)',
        themedCookieBoxBackground: 'var(--colors-cookieBoxBackground)',
        themedText: `var(--colors-text)`,
        themedSubtileText: 'var(--colors-subitleText)',
        themedDropdownBackground: 'var(--colors-dropdownBackground)',
        themedDropdownItemBackground: 'var(--colors-dropdownItemBackground)',
        themedDropdownIconBackground: 'var(--colors-dropdownIconBackground)',
        
        brandBlack: '#000000',
        brandBlue: '#1597E5',
        brandLinkBlue: '#3b82f6',
        brandGray: '#212121',
        brandGreen: '#22c55e',
        brandWhite: '#fefffe',
        brandYellow: '#eab308',
        brandRed: '#D61C4E'
      },
      typography: {
        primary: `'Roboto', sans-serif`,
        secondary: `'Maven Pro', sans-serif`
      },
      screens: {
        small: '560px',
        medium: '992px',
        large: '1200px'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
