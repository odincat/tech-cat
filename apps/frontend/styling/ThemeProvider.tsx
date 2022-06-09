import { ThemeProvider, useTheme } from '@emotion/react';
import { ReactNode, useEffect, useState } from 'react';
import { darkTheme, lightTheme, Theme } from './Theme';
import { GLOBAL_theme, useStore } from '@lib/store';

export type Themes = 'dark' | 'light' | '';

const useThemeHelper = () => {
    const theme = useStore(GLOBAL_theme);

    const [themeHasLoaded, setThemeHasLoaded] = useState<boolean>(false);

    const parseSavedTheme = (input: string) => {
        // We extract this so that we get full type safety and a happy ts server
        const darkTheme: Themes = 'dark';
        const lightTheme: Themes = 'light';

        switch (input) {
            case 'dark':
                return darkTheme;

            case 'light':
                return lightTheme;

            // provide a fallback if the saved item doesn't match
            default:
                return darkTheme;
        }
    };

    useEffect(() => {
        const getStoredTheme = localStorage.getItem('theme');

        if (!getStoredTheme) {
            if (
                window.matchMedia('(prefers-color-scheme: dark)').matches ||
                window.matchMedia('(prefers-color-scheme: no-preference)')
                    .matches
            ) {
                theme.set('dark');
                setThemeHasLoaded(true);
                return;
            } else {
                theme.set('light');
                setThemeHasLoaded(true);
                return;
            }
        }

        theme.set(parseSavedTheme(getStoredTheme));
        setThemeHasLoaded(true);
    }, []);

    return {
        theme,
        themeHasLoaded,
    };
};

export const TechCatThemeProvider = (props: { children: ReactNode }) => {
    const { theme, themeHasLoaded } = useThemeHelper();

    const loadTheme = (theme: Themes) => {
        switch (theme) {
            case 'dark':
                return darkTheme;

            case 'light':
                return lightTheme;
        }
    };

    if (!themeHasLoaded) return null;

    return (
        <ThemeProvider theme={() => loadTheme(theme.get())}>
            {props.children}
        </ThemeProvider>
    );
};

export const useThemed = () => {
    return useTheme() as Theme;
};
