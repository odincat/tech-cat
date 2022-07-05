const initTheme = () => {
    const localStorageItemName = 'theme';

    const getLocalStorageItem = () => {
        return localStorage.getItem(localStorageItemName);
    };

    const setTheme = (theme, save) => {
        //Set new theme
        document.body.dataset.theme = theme;

        if (!save) return;
        if (getLocalStorageItem() === theme) {
            return;
        }
        localStorage.setItem('theme', theme);
        return;
    };
    if (!getLocalStorageItem()) {
        setTheme('dark', true);
    }

    const currentTheme = getLocalStorageItem().toString();
    setTheme(currentTheme, true);
};

initTheme();
