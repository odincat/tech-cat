import Link from "next/link";
import { createDictionary } from "./utils";

export const SHARED_dictionary = createDictionary({
    cookieBox: {
        title: {
            de: 'Cookie-Hinweis',
            en: 'Cookie notice'
        },
        body: {
            de: <p>Diese Website verwendet Cookies & Analysetools die dazu dienen dir eine bessere Nutzererfahrung zu ermöglichen. Eine transparente Übersicht der verwendeten Cookies & Tracker findest du <Link href='/cookies'>hier</Link>.</p>,
            en: <p>This website uses cookies and tracking tools to improve your experience. A detailed overview of the trackers used can be found <Link href='/cookies'>here</Link>.</p>
        },
        accept: {
            de: 'Akzeptieren',
            en: 'Accept'
        },
        decline: {
            de: 'Ablehnen',
            en: 'Decline'
        }
    }
});