import { css } from "@emotion/react";
import { NextComponent } from "@lib/types";
import { useThemed } from "@styling/ThemeProvider";
import { colors } from "@styling/variables";
import Link from "next/link";
import { useRouter } from "next/router";

type Colors = 'primary' | 'secondary' | 'blue' | 'green';

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: Colors;
    compact?: boolean;
    icon?: JSX.Element;
    href?: string;
}

export const TButton: NextComponent<Button> = ({ color = 'primary', compact = false, icon = null, href = '', ...props}) => {
    const router = useRouter();

    const openLink = () => {
        if (href === '') return;

        if(href.startsWith('/')) {
            router.push(href);
        } else {
            window.open(href, '_blank', 'noopener,noreferrer');
        }
    }

    const theme = useThemed();

    const getBackgroundColor = () => {
        switch (color) {
            case 'primary':
                return theme.buttonBackground;
            case 'secondary':
                return theme.buttonBackground;
            case 'blue':
                return colors.blue;
            case 'green':
                return colors.green;
        }
    };

    const styledButton = css`
        background-color: ${getBackgroundColor()};
        border-radius: 3px;
        position: relative;
        cursor: pointer;
        color: white;
        
        ${compact ? 'padding: 0.1em 0.5em;' : 'padding: 0.3em 1em;'}
        
        &:hover {
            text-decoration: none;
        }

        &:disabled {
            cursor: not-allowed;
        }
    `;

    return (
        <button onClick={openLink} css={styledButton} {...props}>
            { props.children }
        </button>
    );
};