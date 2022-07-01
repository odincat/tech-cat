import Link from "next/link";
import { createDictionary } from "./utils";

export const SHARED_dictionary = createDictionary({
    cookieBox: {
        title: {
            de: 'Cookie-Hinweis',
            en: 'Cookie notice'
        },
        body: {
            de: <p>Diese Website verwendet <u>Cookies</u> & <u>Analytiktools</u> die dazu dienen dir eine <b>bessere Nutzererfahrung</b> zu ermöglichen. Eine transparente Übersicht der verwendeten Cookies & Tracker findest du <Link href='/cookies'>hier</Link>.</p>,
            en: <p>This website uses <u>cookies</u> and <u>tracking tools</u> to <b>improve</b> your experience. A detailed overview of the trackers used can be found <Link href='/cookies'>here</Link>.</p>
        },
        accept: {
            de: 'Akzeptieren',
            en: 'Accept'
        },
        decline: {
            de: 'Ablehnen',
            en: 'Decline'
        }
    },
    skipNavigation: {
        de: 'Springe zu Inhalt',
        en: 'Skip to main content'
    },
    hi: {
        // Make the object below accept a typescript argument

        de: (args) => {
            return <b>Hallo {args.name}. Wie geht's dir {args.cat}</b>;
        },
        en: (args) => {
            return `Hi ${args.name}. How are you ${args.cat}?`;
        }
    }
});