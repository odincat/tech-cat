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
        name: 'Projekte',
        route: '/projects',
        activeClassSelector: 'exact',
    },
];
