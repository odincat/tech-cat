import { CButton } from "@components/ui/Button";
import { useModal } from "@components/ui/Modal";
import { NextComponent } from "@lib/types";
import { createDictionary, useTranslation } from "@locales/utils";
import { Session as SessionType } from "@prisma/client";
import { trpc } from '@lib/trpc';
import { formatDistanceToNow } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";
import { Message } from "@components/ui/Modal";
import { Loader } from "@components/ui/Loader";
import { RiDeleteBin6Fill, RiDoorOpenFill } from "react-icons/ri";
import toast from "react-hot-toast";

const sessionDictionary = createDictionary({
    expiresIn: {
        de: 'verbleibend',
        en: 'remaining'
    },
    current: {
        de: 'Aktuell',
        en: 'Current'
    },
    signOut: {
        de: 'Abmelden',
        en: 'Sign out'
    },
    signOutConfirm: {
        de: 'Möchtest du dich wirklich abmelden?',
        en: 'Are you sure you want to sign out?'
    },
    delete: {
        de: 'Löschen',
        en: 'Delete'
    },
    deleteConfirm: {
        de: 'Möchtest du diese Sitzung wirklich löschen?',
        en: 'Are you sure you want to delete this session?'
    },
    signOutEverywhere: {
        de: 'Abmelden von allen Geräten',
        en: 'Sign out everywhere'
    },
    singOutEverywhereConfirm: {
        de: 'Möchtest du dich wirklich von allen Geräten abmelden?',
        en: 'Are you sure you want to sign out from all devices?'
    }
});

const BrowserDisplay: NextComponent<{ browser: string; className?: string }> = (props) => {
    let src;
    const BASE_URL = '/browsers/'

    switch(props.browser) {
        case 'Chrome' || 'Chromium':
            src = 'chrome.png';
            break;
        case 'Firefox':
            src = 'firefox.png';
            break;
        case 'Safari':
            src = 'safari.png';
            break;
        case 'Edge':
            src = 'edge.png'; 
            break;
        case 'Opera':
            src = 'opera.png';
            break;
        case 'Internet Explorer':
            src = 'toaster.jpg';
            break;
        case 'Vivaldi':
            src = 'vivaldi.png';
            break;
        default:
            src = 'unkown.png';
    }

    return <img src={BASE_URL + src} alt={props.browser} className={props.className} />;
}

interface SessionProps {
    userAgent: string;
    isCurrent: boolean;
    expiresIn: Date;
    deleteSession: (id: string) => void;
    signOut: () => void;
    id: string;
}

export const Session: NextComponent<SessionProps> = (props) => {
    const ua = new UAParser(props.userAgent);

    const { ts, routerLocale } = useTranslation();

    const signOutConfirmationModal = useModal();
    const deleteSessionConfirmationModal = useModal();

    const deleteSession = () => {
        props.deleteSession(props.id);
        deleteSessionConfirmationModal.close();
    }

    return (<div className="flex items-center bg-slate-200 dark:bg-gray-600 p-5 rounded-md mb-4">
        <BrowserDisplay className="w-[50px] mr-5" browser={ua.getBrowser().name ?? ''} />
        <div className="">
            <span className="text-xl font-bold">{ua.getBrowser().name} (V. {ua.getBrowser().version?.split('.')[0]})</span>
            <span className="block">{formatDistanceToNow(props.expiresIn, { locale: routerLocale === 'de' ? de : enUS })} {ts(sessionDictionary.expiresIn)}</span>
        </div>
        <div className="ml-auto">
            {props.isCurrent && <span className="mr-5 font-bold text-green-400">{ts(sessionDictionary.current)}</span>}
            {props.isCurrent ? <CButton color="blue" onClick={signOutConfirmationModal.show} compact noEffect>{ts(sessionDictionary.signOut)}</CButton> : <CButton color="red" onClick={deleteSessionConfirmationModal.show} compact noEffect>{ts(sessionDictionary.delete)}</CButton>}
        </div>

        <signOutConfirmationModal.Render>
                <Message title="Sign out" description="Are you sure that you want to sign out?" icon={<RiDoorOpenFill />}>
                    <div className="flex">
                        <CButton className="w-max" color="red" onClick={signOutConfirmationModal.close} compact>Cancel</CButton>
                        <CButton className="ml-auto w-max" color="green" onClick={props.signOut} compact>Sign out</CButton>
                    </div>
                </Message>
        </signOutConfirmationModal.Render>

        <deleteSessionConfirmationModal.Render>
            <Message title="Revoke session access" description="Do you really want to eliminate that session?" icon={<RiDeleteBin6Fill />}>
                <div className="flex">
                    <CButton className="w-max" color="red" onClick={deleteSessionConfirmationModal.close} compact>Cancel</CButton>
                    <CButton className="ml-auto w-max" color="green" onClick={deleteSession} compact>Revoke access</CButton>
                </div>
            </Message>
        </deleteSessionConfirmationModal.Render>
   </div>); 
}

export const SessionList: NextComponent = (props) => {
    const router = useRouter();

    const sessionQuery = trpc.auth.getSessions.useQuery();
    const deleteSession = trpc.auth.deleteSession.useMutation(); 
    const signOut = trpc.auth.signOut.useMutation();

    const [renderedSessions, setRenderedSessions] = useState<SessionType[]>();

    useEffect(() => {
        if(!sessionQuery.data) return;

        setRenderedSessions(sessionQuery.data.sessions.sort((a, b) => {
            return a.id === sessionQuery.data.currentId ? -1 : b.id === sessionQuery.data.currentId ? 1 : 0;
        }));
    }, [sessionQuery]);

    const handleSessionDelete = async (id: string) => {
        await deleteSession.mutateAsync({
            id
        }).then(() => {
            toast.success('Session has been revoked');
            // setRenderedSessions(renderedSessions?.filter(session => session.id !== id));
        });
    };

    const handleSignOut = async () => {
        await signOut.mutateAsync().then(() => {
            router.push('/')
        }).then(() => {
            toast.success('You have been signed out');
        });
    };

    if(!renderedSessions || !sessionQuery.data) {
        return (
            <div className="flex flex-col items-center">
                <Loader />
            </div>
        );
    }

    return (
        <>
            {renderedSessions.map((session: SessionType) => {
                return <Session key={session.id} id={session.id} userAgent={session.userAgent} isCurrent={session.id === sessionQuery.data.currentId} expiresIn={session.expiresAt} deleteSession={() => handleSessionDelete(session.id)} signOut={handleSignOut} />})
            }
        </>
    );
}
