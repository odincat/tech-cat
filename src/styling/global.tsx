import { globalCss } from '@stitches';
import { colors } from './variables';

export type Themes = 'dark' | 'light' | '';

export const injectGlobalStyles = globalCss({
    body: {
        fontFamily: '$primary',
        fontSize: '16px',
        color: '$text',
    },

    // Text selection color
    '::selection': {
        backgroundColor: '$blue',
    },

    // Icons
    '.global-icon': {
        display: 'inline-block',
        verticalAlign: '-3px',
        lineHeight: '1em',
        height: '1em',
    },

    '.content': {
        'h1, h2, h3': {
            marginBottom: '1rem',
            fontFamily: '$secondary',
            // textAlign: 'center',
            lineHeight: '1',
        },

        a: {
            color: '$linkBlue',
            textDecoration: 'none',
            transition: 'all 250ms ease-out',

            '&:hover': {
                textDecoration: 'underline',
            },
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
        '--colors-cookieBoxBackground': '#111314',
        '--colors-text': colors.white,
        '--colors-subtileText': '#d0d0d0',
        '--colors-dropdownBackground': 'var(--colors-gray)',
        '--colors-dropdownItemBackground': '#333333',
        '--colors-dropdownIconBackground': '#484a4d'
    },
    '[data-theme=light]': {
        '--colors-pageBackground': '#eee',
        '--colors-buttonBackground': '#777777',
        '--colors-buttonText': colors.white,
        '--colors-footerBackground': colors.white,
        '--colors-githubLink': '#15181e',
        '--colors-hamburgerBackground': '#ffffffcc',
        '--colors-headerBackground': '#ffffff26',
        '--colors-cookieBoxBackground': '#e0e0e0',
        '--colors-text': '#151313',
        '--colors-subtileText': '#666',
        '--colors-dropdownBackground': '#dfdfdf',
        '--colors-dropdownItemBackground': '#cfcfcf',
        '--colors-dropdownIconBackground': '#9c9fa5'
    },
});
