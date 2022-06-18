import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react'

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
            background: 'var(--theme-background)',
            buttonBackground: 'var(--theme-buttonBackground)',
            buttonText: `var(--theme-buttonText)`,
            footerBackground: `var(--theme-footerBackground)`,
            githubLink: 'var(--theme-githubLink, #f0f6fc)',
            hamburgerBackground: 'var(--theme-hamburgerBackground)',
            headerBackground: 'var(--theme-headerBackground)',
            text: `var(--theme-text)`,

            black: '#000000',
            blue: '#1597E5',
            gray: '#212121',
            green: '#22c55e',
            white: '#fefffe',
            yellow: '#eab308',
        },
        fonts: {
            primary: `'Roboto', sans-serif`,
            secondary: `'Maven Pro', sans-serif`,
        }
    },
    media: {
        small: '(max-width: 560px)',
        medium: '(max-width: 992px)',
        large: '(max-width: 1200px)',
    },
});

export type CSS = Stitches.CSS<typeof config>;
