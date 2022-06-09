import { css } from '@emotion/react';
import { GLOBAL_theme, useStore } from '@lib/store';
import { NextComponent } from '@lib/types';
import { Themes } from '@styling/ThemeProvider';
import { colors } from '@styling/variables';
import { FaMoon, FaSun } from 'react-icons/fa';

const ToggleThemeSwitch: NextComponent = () => {
    const theme = useStore(GLOBAL_theme);

    const setTheme = (newTheme: Themes, save: boolean) => {
        theme.set(newTheme);

        if (!save) return;
        if (localStorage.getItem('theme') === newTheme) {
            return;
        }

        localStorage.setItem('theme', newTheme);
    };

    const handleButtonClick = () => {
        switch (theme.get()) {
            case 'dark':
                setTheme('light', true);
                break;

            case 'light':
                setTheme('dark', true);
                break;
        }
    };

    const styledThemeSwitch = css`
        padding: 0.5rem;
        margin-left: 0.5rem;
        border-radius: 50%;
        transition: all 150ms;
        ${theme.get() === 'light' &&
        css`
            background-color: #d4d4d8;
            color: #3b82f6;
        `}
        ${theme.get() === 'dark' &&
        css`
            background-color: #3f3f46;
            color: ${colors.yellow};
        `}
    `;

    return (
        <>
            {theme && (
                <button
                    title='Switch between light and dark appearance'
                    onClick={handleButtonClick}
                    css={styledThemeSwitch}>
                    {theme.get() === 'light' && (
                        <FaMoon style={{ display: 'block' }} />
                    )}
                    {theme.get() === 'dark' && (
                        <FaSun style={{ display: 'block' }} />
                    )}
                </button>
            )}
        </>
    );
};

export default ToggleThemeSwitch;
