import { SkipNavigation } from './Accessibility';
import Navbar from './navbar/Navbar';
import ThemeSwitcher from './ThemeSwitcher';
import { FaGithubSquare, FaTwitterSquare } from 'react-icons/fa';
import { NextComponent } from '@lib/types';
import { ReactNode } from 'react';
import { styled } from '@stitches';

/*
    This file is supposed to be edited. Rather change stuff in here than in _app.tsx.
*/

const PageContent = styled('div', {
    flex: '1',
    marginInline: '10%',
    paddingTop: '2rem',
});

const PageHeader = styled('header', {
    backgroundColor: '$headerBackground',
    backdropFilter: 'blur(5px)',
});

const PageFooter = {
    Container: styled('footer', {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '$footerBackground',
        padding: '0.5rem 0.75rem',
        width: '100%',
    }),
    SocialLinkContainer: styled('div', {
        marginRight: '16px',
    }),
    SocialLink: styled('a', {
        transition: 'all 200ms ease-in-out',
        fontSize: '1.5rem',
        '&:hover': {
            filter: 'brightness(80%)',
        },
        '&:not(:last-child)': {
            marginRight: '0.5rem',
        },
        variants: {
            network: {
                github: {
                    color: '$githubLink',
                },
                twitter: {
                    color: '#179cf0',
                },
            },
        },
    }),
    Link: styled('a', {
        color: '$blue',
        marginRight: '1rem',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
        '@small': {
            display: 'block',
        },
    }),
    Copyright: styled('div', {
        marginLeft: 'auto',
        marginRight: '0.5rem',
        alignSelf: 'center',
        textAlign: 'right',
    }),
};

const PageWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: '$primary',
    color: '$text',
    backgroundColor: '$background',
    transition: 'background 300ms ease-in-out, color 700ms ease-in-out',
});

/**
 * Sets the content and / or logic of the 'header'.
 * @returns JSX
 */
export const Header: NextComponent = () => {
    return (
        <PageHeader>
            <SkipNavigation />
            <Navbar />
        </PageHeader>
    );
};

/**
 * Sets the content and / or logic of the main page container.
 * @returns JSX
 */
export const Content: NextComponent<{ children: ReactNode }> = (props) => {
    return (
        <PageContent className='content' id='main-content'>
            {props.children}
        </PageContent>
    );
};

/**
 * Sets the content and / or logic of the Footer. The footer will be sticky by default.
 * @returns JSX
 */
export const Footer: NextComponent = () => {
    const currentYear: number = new Date().getFullYear();

    return (
        <PageFooter.Container>
            <PageFooter.SocialLinkContainer>
                <PageFooter.SocialLink
                    href='https://github.com/odincat'
                    target='_blank'
                    rel='noreferrer'
                    network='github'>
                    <FaGithubSquare />
                </PageFooter.SocialLink>
                <PageFooter.SocialLink
                    href='https://twitter.com/theodincat'
                    target='_blank'
                    rel='noreferrer'
                    network='twitter'>
                    <FaTwitterSquare />
                </PageFooter.SocialLink>
            </PageFooter.SocialLinkContainer>
            <div>
                <PageFooter.Link href='/privacy'>
                    Datenschutzerklärung
                </PageFooter.Link>
                <PageFooter.Link href='/about-site'>
                    Über diese Seite
                </PageFooter.Link>
            </div>
            <PageFooter.Copyright>
                &copy;{currentYear} TechCat
            </PageFooter.Copyright>
            <ThemeSwitcher />
        </PageFooter.Container>
    );
};

/**
 * Wraps the whole structure (Header, Content, Footer).
 * @returns JSX
 */
export const PageContainer: NextComponent<{ children: ReactNode }> = (
    props,
) => {
    return <PageWrapper>{props.children}</PageWrapper>;
};
