import { ThemeProvider, useTheme } from "@emotion/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { darkTheme, lightTheme, Theme } from "./Theme";

interface ThemeContextProps {
    currentTheme: Themes;
    setTheme: React.Dispatch<React.SetStateAction<Themes>>;
}

const initialThemeContextData: ThemeContextProps = { currentTheme: 'dark', setTheme: () => {} }

const ThemeContext = createContext(initialThemeContextData);

export const useThemeManager = () => useContext(ThemeContext);

export type Themes = 'dark' | 'light';

const useThemeHelper = () => {
    const [theme, setTheme] = useState<Themes>('dark');
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

        if(!getStoredTheme) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches || window.matchMedia('(prefers-color-scheme: no-preference)').matches) {
                setTheme('dark');
                setThemeHasLoaded(true);
                return;
            } else {
                setTheme('light');
                setThemeHasLoaded(true);
                return;
            }
        }

        setTheme(parseSavedTheme(getStoredTheme));
        setThemeHasLoaded(true);
    }, []);

    return {
        theme,
        setTheme,
        themeHasLoaded
    };
}

export const TechCatThemeProvider = (props: { children: ReactNode }) => {
    const { theme, setTheme, themeHasLoaded } = useThemeHelper();

    const getTheme = (theme: Themes) => {
        switch (theme) {
            case 'dark':
                return darkTheme;

            case 'light':
                return lightTheme;
        }
    }

    if (!themeHasLoaded) return null;

    return (
        <ThemeContext.Provider value={{ currentTheme: theme, setTheme: setTheme }}>
            <ThemeProvider theme={getTheme(theme)}>
                { props.children }
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export const useThemed = () => {
    return useTheme() as Theme;
}