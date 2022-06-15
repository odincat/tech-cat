import { NextComponent } from '@lib/types';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

type Colors = 'primary' | 'secondary' | 'blue' | 'green';

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: Colors;
    compact?: boolean;
    icon?: JSX.Element;
    href?: string;
}

export const TButton: NextComponent<Button> = ({
    color = 'primary',
    compact = false,
    icon = null,
    href = '',
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

    const Button = styled('button', {
        backgroundColor: '$',
        borderRadius: '3px',
        position: 'relative',
        cursor: 'pointer',
        color: 'white',
        variants: {
            compact: {
                true: {
                    padding: '0.1em 0.5em',
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
        },
        '&:disabled': {
            cursor: 'not-allowed',
        },
    });

    return (
        <Button onClick={openLink} compact={compact} color={color} {...props}>
            {props.children}
        </Button>
    );
};
