import { NextComponent } from '@lib/types';
import { CSS, styled } from '@stitches';
import { TokenVariant } from '@styling/tokenVariants';
import { ReactNode } from 'react';

const Container = styled('div', {
    width: '100%',
    position: 'relative',
    borderBottom: '2px solid $colors$gray',
    margin: '0rem auto',

    '&:after': {
        content: '',
        position: 'relative',
        display: 'block',
        height: '2px',
        width: '100%',
        backgroundImage:
            'linear-gradient(to right, $colors$blue, $colors$green)',
        transform: 'scaleX(0)',
        transformOrigin: '0%',
        opacity: '0',
        transition: 'all 250ms ease',
        top: '2px',
    },

    '&:focus-within': {
        borderColor: 'transparent',
    },

    '&:focus-within .label, .input:not(:placeholder-shown) + .label': {
        transform: 'scale(0.8) translateY(-1rem)',
    },

    '&:focus-within::after': {
        transform: 'scaleX(1)',
        opacity: '1',
    },
});

const Input = styled('input', {
    width: '100%',
    border: 'none',
    margin: '0',
    background: 'none',
    color: '$text',
    transition: 'border 500ms',

    '&::placeholder': {
        color: '$subtileText',
    },

    '&:focus': {
        border: 'none',
        outline: 'none',
    },
});

const Label = styled('label', {
    zIndex: '-1',
    left: '0',
    position: 'absolute',
    color: '$text',
    transform: 'translateY(0.25rem)',
    transformOrigin: '0%',
    transition: 'transform 400ms',
});

export interface TInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    iconColor?: TokenVariant<'colors'>;
    buttonContent?: JSX.Element | string;
    withButton?: ReactNode;
    icon?: ReactNode;
    label?: string;
    containerClass?: any;
}

export const TInput: NextComponent<TInputProps> = ({
    icon,
    iconColor,
    withButton,
    containerClass,
    label,
    ...props
}) => {
    return (
        <Container className={containerClass}>
            <Input className='input' {...props}>
                {props.children}
            </Input>
            <Label className='label'>{label}</Label>
        </Container>
    );
};
