// playwright.config.ts
import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    projects: [
        {
            name: 'Microsoft Edge',
            use: { 
                channel: 'msedge'
            },
        },
        {
            name: 'Chrome',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'Safari (Webkit)',
            use: { ...devices['Desktop Safari'] },
        },
    ],
};

export default config;