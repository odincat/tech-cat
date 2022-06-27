import Link from "next/link";
import { useRouter } from "next/router";

type Translation = string | JSX.Element | (() => string | JSX.Element);
interface Languages {
    de: Translation;
    en: Translation;
}
export interface Dictionary {
    [entry: string]: Languages | Dictionary;
}

export const createDictionary = <T extends Dictionary>(arg: T): T => {
    return arg;
}

export const translateString = (entry: Languages) => {
    const router = useRouter();

    const locale = router.locale as 'de' | 'en';

    return entry[locale];
};
