import { globalCss } from '@stitches';
import { colors } from './variables';

export type Themes = 'dark' | 'light' | '';

export const injectGlobalStyles = globalCss({
    '[data-theme=dark]': {
        '--colors-background': '#424242',
        '--colors-buttonBackground': '#343a40',
        '--colors-buttonText': colors.white,
        '--colors-footerBackground': colors.gray,
        '--colors-githubLink': '#f0f6fc',
        '--colors-hamburgerBackground': '#262626cc',
        '--colors-headerBackground': '#2626264d',
        '--colors-text': colors.white,
    },
    '[data-theme=light]': {
        '--colors-background': '#f5f5f5',
        '--colors-buttonBackground': '#777777',
        '--colors-buttonText': colors.white,
        '--colors-footerBackground': colors.white,
        '--colors-githubLink': '#15181e',
        '--colors-hamburgerBackground': '#ffffffcc',
        '--colors-headerBackground': '#ffffff26',
        '--colors-text': colors.black,
    },
});
