import { useRouter } from 'next/router';

export type LanguageShorthands = 'de' | 'en';

type Translation = string | JSX.Element | ((args: any) => string | JSX.Element);

interface Languages {
    de: Translation;
    en: Translation;
}

export interface Dictionary {
    [entry: string]: Languages | Dictionary;
}

export const createDictionary = <T extends Dictionary>(arg: T): T => {
    return arg;
};

export const useTranslation = () => {
    const router = useRouter();

    const locale = router.locale as LanguageShorthands;

    return {
        // ts = translate string
        ts: (entry: Languages, args?: any) => {
            if (typeof entry[locale] === 'function') {
                // We are sure that the entry is a function, so we can safely declare it with "as" to avoid type errors
                const smartEntry = entry[locale] as Function;

                return smartEntry(args);
            } else {
                return entry[locale];
            }
        },
        routerLocale: locale
    };
};

