import { SkipNavigation } from './Accessibility';
import Navbar from './Navbar';
import ToggleThemeSwitch from './ToggleThemeSwitch';
import { FaGithubSquare, FaTwitterSquare } from 'react-icons/fa';
import { NextComponent } from '@lib/types';
import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { useThemed } from '@styling/ThemeProvider';
import { colors, fonts, responsive } from '@styling/variables';

/*
    This file is supposed to be edited. Rather change stuff in here than in _app.tsx.
*/

/**
 * Sets the content and / or logic of the 'header'.
 * @returns JSX
 */
export const Header: NextComponent = () => {
    const theme = useThemed();

    const styledHeader = css`
        background-color: ${theme.headerBackground};
        backdrop-filter: blur(5px);
    `;

    return (
        <header className='header' css={styledHeader}>
            <SkipNavigation />
            <Navbar />
        </header>
    );
};

/**
 * Sets the content and / or logic of the main page container.
 * @returns JSX
 */
export const Content: NextComponent<{ children: ReactNode }> = (props) => {

    const styledContent = css`
        flex: 1;
        margin-inline: 10%;
        padding-top: 2rem;
    `;

    return (
        <div className='content' css={styledContent} id='main-content'>
            {props.children}
        </div>
    );
};

/**
 * Sets the content and / or logic of the Footer. The footer will be sticky by default.
 * @returns JSX
 */
export const Footer: NextComponent = () => {
    const currentYear: number = new Date().getFullYear();

    const theme = useThemed();

    const styledFooter = css`
        display: flex;
        align-items: center;
        background-color: ${theme.footerBackground};
        padding: 0.5rem 0.75rem;
        width: 100%;
    `;

    const styledSocialLinks = css`
        margin-right: 16px;

        a {
            transition: all 200ms ease-in-out;
            font-size: 1.5rem;

            &:hover {
                filter: brightness(80%);
            }
        }

        .github {
            margin-right: 0.5rem;
            color: ${theme.githubLink};
        }

        .twitter {
            color: #179cf0;
        }
    `;

    const styledLinks = css`
        a {
            color: ${colors.blue};
            margin-right: 1rem;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }

            ${responsive('small')} {
                display: block;
            }
        }
    `;

    const styledCopyright = css`
        margin-left: auto;
        margin-right: 0.5rem;
        align-self: center;
        text-align: right;
    `;

    return (
        <footer className='footer' css={styledFooter}>
            <div className='social-links' css={styledSocialLinks}>
                <a
                    href='https://github.com/odincat'
                    target='_blank'
                    rel='noreferrer'
                    className='github'>
                    <FaGithubSquare />
                </a>
                <a
                    href='https://twitter.com/theodincat'
                    target='_blank'
                    rel='noreferrer'
                    className='twitter'>
                    <FaTwitterSquare />
                </a>
            </div>
            <div css={styledLinks}>
                <a
                    href='/privacy'>
                    Datenschutzerklärung
                </a>
                <a
                    href='/about-site'>
                    Über diese Seite
                </a>
            </div>
            <div css={styledCopyright}>
                &copy;{currentYear} TechCat
            </div>
            <ToggleThemeSwitch />
        </footer>
    );
};

/**
 * Wraps the whole structure (Header, Content, Footer).
 * @returns JSX
 */
export const PageContainer: NextComponent<{ children: ReactNode }> = (
    props,
) => {
    const theme = useThemed();

    const styledPageContainer = css`
        display: flex;
        min-height: 100vh;
        font-family: ${fonts.primary};
        flex-direction: column;
        color: ${theme.text};
        background-color: ${theme.background};
        transition: background 300ms ease-in-out, color 700ms ease-in-out;
    `;

    return <div className='pagecontainer' css={styledPageContainer}>{props.children}</div>;
};
