import { getLocalStorageItem, setTheme } from '@lib/theme';
import { NextComponent } from '@lib/types';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ToggleThemeSwitch: NextComponent = () => {
    var [currentTheme, setCurrentTheme] = useState('');

    useEffect(() => {
        setCurrentTheme(getLocalStorageItem()?.toString()!);
    }, []);

    const handleButtonClick = () => {
        if (currentTheme === 'dark') {
            setTheme('light', true);
            setCurrentTheme(getLocalStorageItem()?.toString()!);
        }
        if (currentTheme === 'light') {
            setTheme('dark', true);
            setCurrentTheme(getLocalStorageItem()?.toString()!);
        }
    };

    return (
        <>
            {currentTheme && (
                <button
                    title='Switch between light and dark appearance'
                    onClick={handleButtonClick}
                    className={`p-2 ml-2 bg-white rounded-[50%] transition-all ${
                        currentTheme !== 'dark'
                            ? 'bg-zinc-300 text-blue-500'
                            : 'bg-zinc-700 text-yellow-500'
                    }`}>
                    {currentTheme !== 'dark' ? (
                        <FaMoon style={{ display: 'block' }} />
                    ) : (
                        <FaSun style={{ display: 'block' }} />
                    )}
                </button>
            )}
        </>
    );
};

export default ToggleThemeSwitch;
