import { css } from '@emotion/react';
import { NextComponent } from '@lib/types';
import { useThemed } from '@styling/ThemeProvider';
import { colors, fonts, responsive } from '@styling/variables';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: NextComponent = () => {
    const menuItems = [
        {
            name: 'Home',
            route: '/',
        },
        {
            name: 'About me',
            route: '/about',
        },
        {
            name: 'Projekte',
            route: '/projects',
        },
    ];

    interface NavLinkArgs {
        target: string;
        displayName: string;
    }

    const NavLink: NextComponent<NavLinkArgs> = ({ target, displayName }) => {
        const router = useRouter();

        return (
            <a
                href={target}
                className={`${router.pathname == target ? ' active' : ''}`}>
                {displayName}
            </a>
        );
    };

    const HamburgerMenu: NextComponent = () => {
        const [open, setOpen] = useState(false);

        const handleButtonClick = () => {
            setOpen(!open);
        };

        const theme = useThemed();

        const styledHamburgerMenu = css`
            display: none;

            ${responsive('small')} {
                display: block;
            }

            .nav-links-mobile-container {
                background-color: ${theme.hamburgerBackground};
                backdrop-filter: blur(5px);
                position: absolute;
                left: 0;
                right: 0;
                top: 52px;
                opacity: 0;
                display: flex;
                flex-direction: column;
                visibility: hidden;
                transition: all 300ms;

                &.opened {
                    opacity: 1;
                    visibility: visible;
                }

                a {
                    padding: 0.5rem 1rem;

                    &.active {
                        text-decoration: underline;
                        color: ${colors.green};
                    }
                }
            }
        `;

        return (
            <nav css={styledHamburgerMenu} className='hamburger-menu'>
                <button
                    onClick={handleButtonClick}
                    className='nav-mobile-button'>
                    {open ? <FaTimes /> : <FaBars />}
                </button>
                <div
                    className={`nav-links-mobile-container${
                        open ? ' opened' : ''
                    }`}>
                    {menuItems.map((entry) => (
                        <NavLink
                            key={entry.route}
                            target={entry.route}
                            displayName={entry.name}
                        />
                    ))}
                </div>
            </nav>
        );
    };

    const styledNavigation = css`
        padding: 0.5rem 1rem;
        display: flex;
        flex-direction: row;
        padding: 0 1rem 0 1rem 0;
        font-size: 1.25rem;
        line-height: 1.75rem;
        align-items: center;
        justify-content: space-between;
    `;

    const styledLogo = css`
        display: flex;
        align-items: center;
        cursor: pointer;

        .logo {
            margin-right: 0.5rem;
            max-width: 50px;
        }

        .branding {
            user-select: none;
            font-weight: bolder;
            letter-spacing: 2.5px;
            font-size: 30px;
            font-family: ${fonts.secondary};
            background: linear-gradient(210deg, #22c55e, #1597e5, #15dae5);
            background-size: 600% 600%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: branding-background 21s ease infinite;

            @keyframes branding-background {
                0% {
                    background-position: 100% 0%;
                }
                50% {
                    background-position: 0% 100%;
                }
                100% {
                    background-position: 100% 0%;
                }
            }
        }
    `;

    const styledNavLinks = css`
        ${responsive('small')} {
            display: none;
        }

        // Desktop links
        a {
            position: relative;
            text-decoration: none;
            &:not(:last-child) {
                margin-right: 0.7rem;
            }

            &::before {
                content: ' ';
                position: absolute;
                height: 1.5px;
                bottom: 0;
                right: 0;
                width: 0;
                background: linear-gradient(210deg, #22c55e, #1597e5, #15dae5);
                transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            }

            @media (hover: hover) and (pointer: fine) {
                &:hover::before {
                    left: 0;
                    right: auto;
                    width: 100%;
                }
            }

            &.active {
                color: ${colors.green};
            }
        }
    `;

    return (
        <div css={styledNavigation}>
            <Link href='/'>
                <div css={styledLogo}>
                    <img
                        src='logo-cropped.png'
                        alt='TechCat Logo'
                        className='logo'></img>
                    <h1 className='branding'>TechCat</h1>
                </div>
            </Link>
            <nav css={styledNavLinks} className='navlinks-desktop'>
                {menuItems.map((entry) => (
                    <NavLink
                        key={entry.route}
                        target={entry.route}
                        displayName={entry.name}
                    />
                ))}
            </nav>
            <HamburgerMenu />
        </div>
    );
};

export default Navbar;
