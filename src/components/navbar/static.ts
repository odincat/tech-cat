import { ActiveClassSelector } from './NavLink';

interface MenuItem {
    name: string;
    route: string;
    activeClassSelector: ActiveClassSelector;
}

type MenuItems = MenuItem[];

export const navMenuItems: MenuItems = [
    {
        name: 'Home',
        route: '/',
        activeClassSelector: 'exact',
    },
    {
        name: 'About me',
        route: '/about-me',
        activeClassSelector: 'exact',
    },
    {
        name: 'Projects',
        route: '/projects',
        activeClassSelector: 'exact',
    },
    {
        name: 'Articles',
        route: '/blog',
        activeClassSelector: 'containsexact',
    }
];
