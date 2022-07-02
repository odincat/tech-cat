import { NextComponent } from "@lib/types";
import { styled } from "@stitches";
import { TokenVariant, tokenVariants } from "@styling/tokenVariants";
import { ReactNode } from "react";

const Container = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '350px',
    color: '$text',
    position: 'relative',
    padding: '12px',
    backgroundColor: '$gray',
});

const Input = styled('input', {
    width: '100%',
    outline: '0',
    borderBottom: '1px solid #ccc',
    color: '$text',
    fontSize: '1rem',
    appearance: 'none',
    '-webkit-tap-highlight-color': 'transparent',
});

const Icon = styled('div', {
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    width: '2em',
    variants: {
        color: tokenVariants({
            token: 'colors',
            css: (value) => ({
                color: value,
            }),
        }),
    }
});

const Label = styled('label', {
    fontSize: '1em',
    padding: '0 12px',
    color: '#999',
    pointerEvents: 'none',
    position: 'absolute',
    transform: 'translate(0, 26px) scale(1)',
    transformOrigin: 'top left',
    lineHeight: '1',
    left: '16px'
});

export interface TInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    iconColor?: TokenVariant<'colors'>;
    buttonContent?: JSX.Element | string;
    withButton?: ReactNode;
    icon?: ReactNode;
    label?: string;
};

export const TInput: NextComponent<TInputProps> = ({icon, iconColor, withButton, label, ...props}) => {

    return (
        <Container>
            {icon && (<Icon color={iconColor}>{icon}</Icon>)}
            <Input {...props}>{props.children}</Input>
        </Container>
    );
};