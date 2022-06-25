import { NextComponent } from '@lib/types';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { css, keyframes, styled } from '@stitches';
import { TokenVariant, tokenVariants } from '@styling/tokenVariants';

// Resources:
// https://dev.to/jashgopani/windows-10-button-hover-effect-using-css-and-vanilla-js-1io4#additional-resources (amazing article)

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
                '--button-background': '$colors$blue'
            },
            green: {
                backgroundColor: '$green',
            },
        },
        noEffect: {
            false: {
                transition: 'all 150ms cubic-bezier(.42,.43,1,.53)',
                
                '&:hover': {
                    $$shadowColor: '$colors$buttonBackground',
                    transform: 'translateY(-0.25em)',
                    boxShadow: '0 0.5em 0.5em -0.4em inherit'
                },
            },
        },
    },
    
    '&:disabled': {
        cursor: 'not-allowed',
        pointerEvents: 'none',
        filter: 'brightness(70%)',
        userSelect: 'none',
        
        '&:hover': {
            transform: 'translateY(0)',
        },
    },
});

const Icon = styled('div', {
    display: 'inline',
    pointerEvents: 'inherit',
    variants: {
        position: {
            left: {
                marginRight: '0.5em',
            },
            right: {
                marginLeft: '0.5em',
            },
        },
        iconColor: tokenVariants({
            token: 'colors',
            css: (value) => ({
                color: value,
            }),
        }),
    },
});

type Colors = 'primary' | 'secondary' | 'blue' | 'green';

interface TButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: Colors;
    compact?: boolean;
    href?: string;
    leftIcon?: ReactNode;
    leftIconColor?: TokenVariant<'colors'>;
    noEffect?: boolean;
    rightIcon?: ReactNode;
    rightIconColor?: TokenVariant<'colors'>;
}

export const TButton: NextComponent<TButtonProps> = ({
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
    const [coordinates, setCoordinates] = useState<{ x: number; y: number; }>();
    const [isOnButton, setIsOnButton] = useState<boolean>(false);

    const backgroundMagic = css({})

    const router = useRouter();

    const openLink = () => {
        if (href === '') return;

        if (href.startsWith('/')) {
            router.push(href);
        } else {
            window.open(href, '_blank', 'noopener,noreferrer');
        }
    };

    const handleMouseLeave = () => {
        setIsOnButton(false);
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOnButton(true);

        const rect = e.target.getBoundingClientRect();

        setCoordinates({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    return (
        <Button
            onClick={openLink}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            compact={compact}
            color={color}
            noEffect={noEffect}
            style={isOnButton ? { backgroundImage: `radial-gradient(circle at ${coordinates?.x}px ${coordinates?.y}px , rgba(255,255,255, 0.2) 10%, var(--button-background) 100% )`} : {}}
            {...props}>
            {leftIcon && (
                <Icon position='left' iconColor={leftIconColor}>
                    {leftIcon}
                </Icon>
            )}

            {props.children}

            {rightIcon && (
                <Icon position='right' iconColor={rightIconColor}>
                    {rightIcon}
                </Icon>
            )}
        </Button>
    );
};
