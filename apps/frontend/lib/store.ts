import { createState, useState } from '@hookstate/core';
import {Themes} from "@styling/ThemeProvider";

// helper function
export const useStore = (source: any) => {
    return useState(source);
};

export const GLOBAL_theme = createState<Themes>('');
