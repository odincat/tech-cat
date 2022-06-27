import { NextComponent } from '@lib/types';
import { styled } from '@stitches';

export const SkipNavigation: NextComponent = () => {
    const SkipNavigationLink = styled('a', {
        position: 'absolute',
        transform: 'translateX(-200%) translateY(-200%)',
        padding: '0.5rem',
        marginTop: '0.5rem',
        marginLeft: '0.5rem',
        borderRadius: '4px',
        transition: 'all 100ms ease-in',
        backgroundColor: '$gray',
        color: '$white',
        zIndex: '5',

        '&:focus': {
            transform: 'translateX(0) translateY(0)',
        },
    });

    return (
        <SkipNavigationLink href='#main-content'>
            Skip Navigation
        </SkipNavigationLink>
    );
};
