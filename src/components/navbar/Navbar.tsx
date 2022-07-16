import { NextComponent } from '@lib/types';
import { css, keyframes, styled } from '@stitches';
import Link from 'next/link';
import { NavLink } from './NavLink';
import { navMenuItems } from './static';
import { HamburgerMenu } from './HamburgerMenu';
import { UserControl } from './User';

const logoAnimation = keyframes({
    '0%': { backgroundPosition: '100% 0%' },
    '50%': { backgroundPosition: '0% 100%' },
    '100%': { backgroundPosition: '100% 0%' },
});

const Navigation = {
    Container: styled('div', {
        padding: '0.5rem 1rem',
        display: 'flex',
        flexDirection: 'row',
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
        alignItems: 'center',
        justifyContent: 'space-between',
    }),
    Logo: {
        Container: styled('div', {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
        }),
        Image: styled('img', {
            marginRight: '0.5rem',
            maxWidth: '50px',
        }),
        Branding: styled('div', {
            userSelect: 'none',
            fontWeight: 'bolder',
            letterSpacing: '2.5px',
            fontSize: '30px',
            fontFamily: '$secondary',
            background: 'linear-gradient(210deg, #22c55e, #1597e5, #15dae5)',
            backgroundSize: '600% 600%',
            backgroundClip: 'text',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
            animation: `${logoAnimation()} 21s ease infinite`,
        }),
    },
    NavLinks: styled('nav', {
        marginLeft: 'auto',
        '@small': {
            display: 'none',
        },
    }),
    SingleNavLink: css({
        position: 'relative',
        textDecoration: 'none',
        '&:not(:last-child)': {
            marginRight: '0.7rem',
        },
        '&:before': {
            content: '',
            position: 'absolute',
            height: '1.5px',
            bottom: '0',
            right: '0',
            width: '0',
            background: 'linear-gradient(210deg, #22c55e, #1597e5, #15dae5)',
            transition: 'width 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        },
        '@media (hover: hover) and (pointer: fine)': {
            '&:hover:before': {
                left: '0',
                right: 'auto',
                width: '100%',
            },
        },
        '&.active': {
            color: '$green',
        },
    }),
};

const Navbar: NextComponent = () => {
    
    return (
        <Navigation.Container>
            <Link href='/'>
                <Navigation.Logo.Container>
                    <Navigation.Logo.Image
                        src='/logo-cropped.png'
                        alt='TechCat Logo'
                        className='logo'></Navigation.Logo.Image>
                    <Navigation.Logo.Branding>TechCat</Navigation.Logo.Branding>
                </Navigation.Logo.Container>
            </Link>
            <Navigation.NavLinks>
                {navMenuItems.map((entry) => (
                    <NavLink
                        className={Navigation.SingleNavLink()}
                        key={entry.route}
                        target={entry.route}
                        displayName={entry.name}
                        activeClassSelector={entry.activeClassSelector}
                    />
                ))}
            </Navigation.NavLinks>
            <UserControl />
            <HamburgerMenu />
        </Navigation.Container>
    );
};

export default Navbar;
