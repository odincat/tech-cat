import { NextComponent } from '@lib/types';
import { useRouter } from 'next/router';
import { ReactNode, useRef, useState } from 'react';
import { Button, buttonBackground, Icon, iconColor } from './Button.style';

// Resources:
// https://dev.to/jashgopani/windows-10-button-hover-effect-using-css-and-vanilla-js-1io4#additional-resources (amazing article)

export interface CButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string;
    compact?: boolean;
    href?: string;
    leftIcon?: ReactNode;
    leftIconColor?: string;
    noEffect?: boolean;
    rightIcon?: ReactNode;
    rightIconColor?: string;
}

export const CButton: NextComponent<CButtonProps> = ({
    color = 'primary',
    compact = false,
    href = '',
    leftIcon = null,
    leftIconColor = "white",
    noEffect = false,
    rightIcon = null,
    rightIconColor = "white",
    ...props
}) => {
    const [coordinates, setCoordinates] = useState<{ x: number; y: number }>();
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
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (noEffect) return;
        if (!buttonRef.current) return;

        setIsOnButton(true);

        // We use the button itself, because we would get false readings due to child elements (icons)
        const rect = buttonRef.current?.getBoundingClientRect();

        setCoordinates({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const buttonStyle = {
        [buttonBackground.setter as any]: color,
        // This is required, because else React will complain that there's a server-client mismatch
        ...(isOnButton && {
            backgroundImage: `radial-gradient(circle at ${coordinates?.x}px ${coordinates?.y}px , rgba(255,255,255, 0.2) 10%, ${buttonBackground.getter} 100% )` }
        )
    }

    return (
        <Button
            onClick={openLink}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            compact={compact}
            noEffect={noEffect}
            ref={buttonRef}
            style={buttonStyle}
            {...props}>
            {leftIcon && (
                <Icon position='left' style={{ [iconColor.setter as any]: leftIconColor }}>
                    {leftIcon}
                </Icon>
            )}

            {props.children}

            {rightIcon && (
                <Icon position='right' style={{ [iconColor.setter as any]: rightIconColor }}>
                    {rightIcon}
                </Icon>
            )}
        </Button>
    );
};
