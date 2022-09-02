import { CButton } from "@components/ui/Button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useModal } from "@lib/modal";
import { NextComponent } from "@lib/types";
import { createDictionary, useTranslation } from "@locales/utils";
import { Session as SessionType } from "@prisma/client";
import { trpc } from "@server/utils/trpc";
import { formatDistanceToNow } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { useRouter } from "next/router";
import { RefObject, useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

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
    var src;
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
    deleteSession: () => void;
    signOut: () => void;
}

export const Session: NextComponent<SessionProps> = (props) => {
    const ua = new UAParser(props.userAgent);

    const { translateString, routerLocale } = useTranslation();

    return (<div className="flex items-center bg-slate-200 dark:bg-gray-600 p-5 rounded-md mb-4">
        <BrowserDisplay className="w-[50px] mr-5" browser={ua.getBrowser().name ?? ''} />
        <div className="">
            <span className="text-xl font-bold">{ua.getBrowser().name} (V. {ua.getBrowser().version?.split('.')[0]})</span>
            <span className="block">{formatDistanceToNow(props.expiresIn, { locale: routerLocale === 'de' ? de : enUS })} {translateString(sessionDictionary.expiresIn)}</span>
        </div>
        <div className="ml-auto">
            {props.isCurrent && <span className="mr-5 font-bold text-green-400">{translateString(sessionDictionary.current)}</span>}
            {props.isCurrent ? <CButton color="blue" onClick={props.signOut} compact noEffect>{translateString(sessionDictionary.signOut)}</CButton> : <CButton color="red" onClick={props.deleteSession} compact noEffect>{translateString(sessionDictionary.delete)}</CButton>}
        </div>
   </div>); 
}

export const SessionList: NextComponent = () => {
    const { translateString } = useTranslation();
    const [transitionParent] = useAutoAnimate();
    const router = useRouter();

    const signOutConfirmationModal = useModal();
    const deleteSessionConfirmationModal = useModal();

    const sessionQuery = trpc.useQuery(['auth.getSessions']);
    const deleteSession = trpc.useMutation(['auth.deleteSession']);
    const signOut = trpc.useMutation(['auth.signOut']);

    const [renderedSessions, setRenderedSessions] = useState<SessionType[]>();

    useEffect(() => {
        if(!sessionQuery.data) return;

        setRenderedSessions(sessionQuery.data.sessions.sort((a) => {
            if(a.id === sessionQuery.data.currentId) return -1;
            return 0;
        }));
    }, [sessionQuery.data]);

    if(!renderedSessions || !sessionQuery.data) {
        return (
            <div className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-md dark:bg-slate-500 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded-md dark:bg-slate-500 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded-md dark:bg-slate-500 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded-md dark:bg-slate-500 mb-4"></div>
            </div>
        )
    }

    const handleSessionDelete = (id: string) => {
        deleteSession.mutate({
            id
        })
    }

    const handleSignOut = async () => {
        await signOut.mutateAsync().then(() => {
            router.push('/auth/login')
        })
    };

    return (
        <div ref={transitionParent as RefObject<HTMLDivElement>}>
            <CButton onClick={signOutConfirmationModal.show}>Show</CButton>
            {renderedSessions.map((session: SessionType) => {
                return <Session key={session.id} userAgent={session.userAgent} isCurrent={session.id === sessionQuery.data.currentId} expiresIn={session.expiresAt} deleteSession={() => handleSessionDelete(session.id)} signOut={() => handleSignOut()} />})
            }
            <signOutConfirmationModal.Render >
                <button onClick={signOutConfirmationModal.hide}>Close</button>
            </signOutConfirmationModal.Render>
        </div>
    );
}