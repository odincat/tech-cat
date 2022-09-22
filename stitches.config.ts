import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';

export const {
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
    config,
} = createStitches({
    theme: {
        colors: {
            pageBackground: 'var(--colors-background)',
            buttonBackground: 'var(--colors-buttonBackground)',
            buttonText: `var(--colors-buttonText)`,
            footerBackground: `var(--colors-footerBackground)`,
            githubLink: 'var(--colors-githubLink, #f0f6fc)',
            hamburgerBackground: 'var(--colors-hamburgerBackground)',
            headerBackground: 'var(--colors-headerBackground)',
            cookieBoxBackground: 'var(--colors-cookieBoxBackground)',
            text: `var(--colors-text)`,
            subtileText: 'var(--colors-subitleText)',
            dropdownBackground: 'var(--colors-dropdownBackground)',
            dropdownItemBackground: 'var(--colors-dropdownItemBackground)',
            dropdownIconBackground: 'var(--colors-dropdownIconBackground)',

            black: '#000000',
            blue: '#1597E5',
            linkBlue: '#3b82f6',
            gray: '#212121',
            green: '#22c55e',
            white: '#fefffe',
            yellow: '#eab308',
            red: '#D61C4E'
        },
        fonts: {
            primary: `'Roboto', sans-serif`,
            secondary: `'Maven Pro', sans-serif`,
            tertiary: `'Press Start 2P', monospace`
        },
    },
    media: {
        small: '(max-width: 560px)',
        medium: '(max-width: 992px)',
        large: '(max-width: 1200px)',
    },
});

export type CSS = Stitches.CSS<typeof config>;
