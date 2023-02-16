import { NextComponent } from '@lib/types';
import { createDictionary, useTranslation } from '@locales/utils';
import { styled } from '@stitches';

const skipLinkDictionary = createDictionary({
    label: {
        de: 'Springe zu Inhalt',
        en: 'Skip to main content',
    },
});

export const SkipNavigation: NextComponent = () => {
    const { ts } = useTranslation();

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
            {ts(skipLinkDictionary.label)}
        </SkipNavigationLink>
    );
};
