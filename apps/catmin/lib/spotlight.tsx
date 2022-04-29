import { SpotlightAction } from "@mantine/spotlight";
import { signOut } from "firebase/auth";
import Router from "next/router";
import { auth, firebaseLogger } from "./firebase";
import { RiDoorOpenLine, RiQuillPenLine, RiStackLine } from 'react-icons/ri';

export const spotlightActions: SpotlightAction[] = [
    {
        title: 'Create new Post',
        description: 'Compose a new masterpiece ✨',
        onTrigger: () => {
            //TODO: create new post
        },
        icon: <RiQuillPenLine />
    },
    {
        title: 'View existing posts',
        description: 'Have a view over your art collection',
        onTrigger: () => {
            //TODO: link to overview
        },
        icon: <RiStackLine />
    },
    {
        title: 'Logout',
        description: 'Sign out of this account',
        onTrigger: () => {
            signOut(auth);
            firebaseLogger.log('Signed out', 'information');
            Router.push({
                pathname: '/authenticate'
            });
        },
        icon: <RiDoorOpenLine />
    }
];