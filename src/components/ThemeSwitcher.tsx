import { NextComponent } from '@lib/types';
import { Themes } from '@styling/global';
import { FaMoon, FaSun } from 'react-icons/fa';
import { styled } from '@stitches';
import { useEffect, useState } from 'react';

const ThemeSwitchButton = styled('button', {
    padding: '0.5rem',
    marginLeft: '0.5rem',
    borderRadius: '50%',
    transition: 'all 150ms',
    variants: {
        theme: {
            dark: {
                backgroundColor: '#3f3f46',
                color: '$yellow',
            },
            light: {
                backgroundColor: '#d4d4d8',
                color: '#3b82f6',
            },
        },
    },
});

const ThemeSwitcher: NextComponent = () => {
    const [theme, setTheme] = useState<Themes>('');

    useEffect(() => {
        const localStorageItem = localStorage
            .getItem('theme')
            ?.toString() as Themes;
        setTheme(localStorageItem);
    }, []);

    const setSiteTheme = (newTheme: Themes, save: boolean) => {
        document.body.dataset.theme = newTheme;
        setTheme(newTheme);

        if (!save) return;
        if (localStorage.getItem('theme') === newTheme) {
            return;
        }

        localStorage.setItem('theme', newTheme);
    };

    const handleButtonClick = () => {
        switch (theme) {
            case 'dark':
                setSiteTheme('light', true);
                break;

            case 'light':
                setSiteTheme('dark', true);
                break;
        }
    };

    return (
        <>
            {theme && (
                <ThemeSwitchButton
                    title='Switch between light and dark appearance'
                    onClick={handleButtonClick}
                    theme={theme}>
                    {theme === 'light' && (
                        <FaMoon style={{ display: 'block' }} />
                    )}
                    {theme === 'dark' && <FaSun style={{ display: 'block' }} />}
                </ThemeSwitchButton>
            )}
        </>
    );
};

export default ThemeSwitcher;
