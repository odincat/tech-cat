interface Languages {
    de: string;
    en: string;
}

const asDictionary = <T extends { [key: string]: Languages }>(arg: T): T => {
    return arg;
}

export const DICTIONARY = asDictionary({
    hi: {
        de: "Hallo",
        en: "Hello"
    },
    hi2: {
        de: "asd",
        en: "dsa"
    },
});