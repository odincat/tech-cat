import { styled, theme } from "@stitches";
import { cssVar } from "@styling/tokenVariants";

export const buttonBackground = cssVar("buttonBackground", theme.colors.buttonBackground.value);

export const Button = styled('button', {
    backgroundColor: buttonBackground.getter,
    borderRadius: '3px',
    position: 'relative',
    cursor: 'pointer',
    color: 'white',
    fontFamily: '$primary',

    variants: {
        compact: {
            true: {
                padding: '0.15em 0.8em',
            },
            false: {
                padding: '0.3em 1em',
            },
        },
        noEffect: {
            false: {
                transition: 'all 150ms cubic-bezier(.42,.43,1,.53)',

                '&:hover': {
                    transform: 'translateY(-0.25em)',
                    boxShadow: '0 10px 10px -10px var(--button-background)',
                },
            },
        },
    },

    // '&:before': {
    //     content: '',
    //     position: 'absolute',
    //     zIndex: '-2',
    //     border: 'var(--button-background) solid 3px',
    //     top: '0',
    //     right: '0',
    //     bottom: '0',
    //     left: '0',
    //     animationDuration: '1s'
    // },

    '&:disabled': {
        cursor: 'not-allowed',
        pointerEvents: 'auto',
        filter: 'brightness(70%)',
        userSelect: 'none',

        '&:hover': {
            transform: 'translateY(0)',
            boxShadow: 'none',
        },
    },
});

export const iconColor = cssVar("iconColor");

export const Icon = styled('span', {
    display: 'inline',
    position: 'relative',
    pointerEvents: 'inherit',
    color: iconColor.getter,
    variants: {
        position: {
            left: {
                marginRight: '0.5em',
            },
            right: {
                marginLeft: '0.5em',
            },
        },
    },
});
