const localStorageItemName: string = 'theme';

export const initializeTheme = () => {
    if(! getLocalStorageItem) {
        setTheme('dark', true);
        return;
    }
    getTheme();
};

export const getTheme = () => {
    const currentTheme: string = getLocalStorageItem()?.toString()!;
    setTheme(currentTheme, true);
}

export const getLocalStorageItem = () => {
    return localStorage.getItem(localStorageItemName);
}

export const setTheme = (theme: string, save: boolean) => {
    document.body.dataset.theme = theme;

    if(!save) return;
    if(getLocalStorageItem() === theme) {
        return;
    }
    localStorage.setItem('theme', theme);
}
