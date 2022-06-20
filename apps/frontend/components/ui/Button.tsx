import { NextComponent } from '@lib/types';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { styled } from '@stitches';
import { TokenVariant, tokenVariants } from '@styling/tokenVariants';
import { VariantProps } from '@stitches/react';

const Button = styled('button', {
    backgroundColor: '$buttonBackground',
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
        color: {
            primary: {
                backgroundColor: '$buttonBackground',
            },
            secondary: {
                backgroundColor: '$buttonBackground',
            },
            blue: {
                backgroundColor: '$blue',
            },
            green: {
                backgroundColor: '$green',
            },
        },
        noEffect: {
            false: {
                'transition': 'all 150ms cubic-bezier(.42,.43,1,.53)',
                '&:hover': {
                    $$shadowColor: '$colors$buttonBackground',
                    transform: 'translateY(-0.25em)',
                    boxShadow: '0 0.5em 0.5em -0.4em inherit'
                }
            }
        }
    },
    
    '&:disabled': {
        cursor: 'not-allowed',
    },
});

const Icon = styled('div', {
    display: 'inline',
    variants: {
        position: {
            'left': {
                marginRight: '0.5em'
            },
            'right': {
                marginLeft: '0.5em'
            }
        },
        iconColor: tokenVariants({
            token: 'colors',
            css: (value) => ({
                color: value
            })
        })
    }
});

type Colors = 'primary' | 'secondary' | 'blue' | 'green';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: Colors;
    compact?: boolean;
    href?: string;
    leftIcon?: ReactNode;
    leftIconColor?: TokenVariant<'colors'>;
    noEffect?: boolean;
    rightIcon?: ReactNode;
    rightIconColor?: TokenVariant<'colors'>;
}

export const TButton: NextComponent<ButtonProps> = ({
    color = 'primary',
    compact = false,
    href = '',
    leftIcon = null,
    leftIconColor,
    noEffect = false,
    rightIcon = null,
    rightIconColor,
    ...props
}) => {
    const router = useRouter();

    const openLink = () => {
        if (href === '') return;

        if (href.startsWith('/')) {
            router.push(href);
        } else {
            window.open(href, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <Button onClick={openLink} compact={compact} color={color} noEffect={noEffect} {...props}>
            {leftIcon && <Icon position='left' iconColor={leftIconColor}>{leftIcon}</Icon>}
                {props.children}
            {rightIcon && <Icon position='right' iconColor={rightIconColor}>{rightIcon}</Icon>}
        </Button>
    );
};
