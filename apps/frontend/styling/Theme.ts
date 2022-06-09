import { colors } from './variables';

export interface Theme {
    background: string;
    buttonBackground: string;
    buttonText: string;
    footerBackground: string;
    githubLink: string;
    hamburgerBackground: string;
    headerBackground: string;
    text: string;
}

export const darkTheme: Theme = {
    background: '#424242',
    buttonBackground: '#343a40',
    buttonText: colors.white,
    footerBackground: colors.gray,
    githubLink: '#f0f6fc',
    hamburgerBackground: '#262626cc',
    headerBackground: '#2626264d',
    text: colors.white,
};

export const lightTheme: Theme = {
    background: '#f5f5f5',
    buttonBackground: '#777777',
    buttonText: colors.white,
    footerBackground: colors.white,
    githubLink: '#15181e',
    hamburgerBackground: '#ffffffcc',
    headerBackground: '#ffffff26',
    text: colors.black,
};
