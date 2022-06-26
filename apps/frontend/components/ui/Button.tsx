import { NextComponent } from '@lib/types';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { css, keyframes, styled } from '@stitches';
import { TokenVariant, tokenVariants } from '@styling/tokenVariants';

// Resources:
// https://dev.to/jashgopani/windows-10-button-hover-effect-using-css-and-vanilla-js-1io4#additional-resources (amazing article)

const rippleOutAnimation = keyframes({
    '100%': {
        top: '-12px',
        right: '-12px',
        bottom: '-12px',
        left: '-12px',
        opacity: '0'
    }
});

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
                '--button-background': '$colors$buttonBackground'
            },
            secondary: {
                backgroundColor: '$buttonBackground',
                '--button-background': '$colors$buttonBackground'
            },
            blue: {
                backgroundColor: '$blue',
                '--button-background': '$colors$blue'
            },
            green: {
                backgroundColor: '$green',
                '--button-background': '$colors$green'
            },
            yellow: {
                backgroundColor: '$yellow',
                '--button-background': '$colors$yellow'
            },
            red: {
                backgroundColor: '$red',
                '--button-background': '$colors$red'
            }
        },
        noEffect: {
            false: {
                transition: 'all 150ms cubic-bezier(.42,.43,1,.53)',
                
                '&:hover': {
                    transform: 'translateY(-0.25em)',
                    boxShadow: '0 10px 10px -10px var(--button-background)'
                },

                '&:focus:before': {
                    animationName: rippleOutAnimation,
                }
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
            boxShadow: 'none'
        },
    },
});

const Icon = styled('span', {
    display: 'inline',
    position: 'relative',
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

type Colors = 'primary' | 'secondary' | 'blue' | 'green' | 'yellow' | 'red';

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

    const buttonRef = useRef<HTMLButtonElement>(null);

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

        if(!buttonRef.current) return;

        // We use the button itself, because we would get false readings due to child elements (icons)
        const rect = buttonRef.current?.getBoundingClientRect();

        setCoordinates({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }

    return (
        <Button
            onClick={openLink}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            compact={compact}
            color={color}
            noEffect={noEffect}
            ref={buttonRef}
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
