import '@styles/reset.scss';
import '@styles/globals.scss';

import { injectGlobalStyles } from '../styling/global';
import { withRootAttribute } from "storybook-addon-root-attribute";
import { addDecorator } from '@storybook/react'

addDecorator(withRootAttribute);

injectGlobalStyles();

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    rootAttribute: {
        root: "body",
        attribute: "data-theme",
        states: [
            {
                name: "Dark",
                value: "dark"
            },
            {
                name: "Light",
                value: "light"
            }
        ]
    }
};
