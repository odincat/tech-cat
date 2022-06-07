import { SkipNavigation } from './Accessibility';
import Navbar from './Navbar';
import ToggleThemeSwitch from './ToggleThemeSwitch';
import { FaGithubSquare, FaTwitterSquare } from 'react-icons/fa';
import { NextComponent } from '@lib/types';
import { ReactNode } from 'react';

/*
    This file is supposed to be edited. Rather change stuff in here than in _app.tsx.
*/

/**
 * Sets the content and / or logic of the 'header'.
 * @returns JSX
 */
export const Header: NextComponent = () => {
    return (
        <header className='header'>
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
    return (
        <div className='content pt-[2rem]' id='main-content'>
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
    return (
        <footer className='footer w-full flex pt-2 pb-2 pr-3 pl-3 items-center'>
            <div className='social-links'>
                <a
                    href='https://github.com/odincat'
                    target='_blank'
                    rel='noreferrer'
                    className='text-[1.5rem] github mr-2'>
                    <FaGithubSquare />
                </a>
                <a
                    href='https://twitter.com/theodincat'
                    target='_blank'
                    rel='noreferrer'
                    className='text-[1.5rem] twitter mr-[16px]'>
                    <FaTwitterSquare />
                </a>
            </div>
            <div className='links'>
                <a
                    href='/privacy'
                    className='mr-4 text-blue-500 hover:underline'>
                    Datenschutzerklärung
                </a>
                <a
                    href='/about-site'
                    className='mr-4 text-blue-500 hover:underline'>
                    Über diese Seite
                </a>
            </div>
            <div className='ml-auto mr-2 self-center text-right'>
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
    return <div className='pagecontainer'>{props.children}</div>;
};
