import { globalCss } from '@stitches';
import { colors } from './variables';

import '@fontsource/maven-pro/700.css';
import '@fontsource/roboto/index.css'

export type Themes = 'dark' | 'light' | '';

export const injectGlobalStyles = globalCss({
    // Icons
    '.global-icon': {
        display: 'inline-block',
        verticalAlign: '-3px',
        lineHeight: '1em',
        height: '1em'
    },

    '.content': { 
        'h1, h2, h3': {
            'marginBottom': '1rem',
            fontFamily: '$secondary',
            lineHeight: '1'
        },


        'a': {
            color: '$linkBlue',
            textDecoration: 'none',
            transition: 'all 200ms ease-in-out',
    
            '&:hover': {
                textDecoration: 'underline'
            }
        },
    },

    // Theme variables
    '[data-theme=dark]': {
        '--colors-pageBackground': '#424242',
        '--colors-buttonBackground': '#343a40',
        '--colors-buttonText': colors.white,
        '--colors-footerBackground': colors.gray,
        '--colors-githubLink': '#f0f6fc',
        '--colors-hamburgerBackground': '#262626cc',
        '--colors-headerBackground': '#2626264d',
        '--colors-text': colors.white,
    },
    '[data-theme=light]': {
        '--colors-pageBackground': '#f5f5f5',
        '--colors-buttonBackground': '#777777',
        '--colors-buttonText': colors.white,
        '--colors-footerBackground': colors.white,
        '--colors-githubLink': '#15181e',
        '--colors-hamburgerBackground': '#ffffffcc',
        '--colors-headerBackground': '#ffffff26',
        '--colors-text': colors.black,
    },
});
