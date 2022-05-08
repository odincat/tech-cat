import { SpotlightAction } from "@mantine/spotlight";
import { signOut } from "firebase/auth";
import Router from "next/router";
import fire from "pacman/firebase";
import { RiDashboard3Line, RiDoorOpenLine, RiQuillPenLine, RiStackLine } from 'react-icons/ri';

export const spotlightActions: SpotlightAction[] = [
    {
        title: 'Create new Post',
        description: 'Compose a new masterpiece ✨',
        onTrigger: () => {
            Router.push({
                pathname: '/dash/post/new'
            });
        },
        icon: <RiQuillPenLine />
    },
    {
        title: 'View existing posts',
        description: 'Have a view over your art collection',
        onTrigger: () => {
            Router.push({
                pathname: '/dash/post/overview'
            });
        },
        icon: <RiStackLine />
    },
    {
        title: 'Go to Dashboard',
        description: 'Return home',
        onTrigger: () => {
            Router.push({
                pathname: '/dash'
            });
        },
        icon: <RiDashboard3Line />
    },
    {
        title: 'Logout',
        description: 'Sign out of this account',
        onTrigger: () => {
            signOut(fire.useAuth());
            fire.logger.log('Signed out', 'information');
            Router.push({
                pathname: '/authenticate'
            });
        },
        icon: <RiDoorOpenLine />
    }
];