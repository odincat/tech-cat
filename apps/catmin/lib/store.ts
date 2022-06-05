import { createState, useState } from '@hookstate/core';

export const useStore = (source: any) => {
    return useState(source);
};

export const GLOBAL_statusMessage = createState('');
