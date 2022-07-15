import { createState, useState } from '@hookstate/core';

// helper function
export const useStore = (source: any) => {
    return useState(source);
};

export const SHARED_cookiesAccepted = createState<boolean>(false);
