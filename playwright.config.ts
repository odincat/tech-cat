// playwright.config.ts
import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    projects: [
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
    workers: 1,
    use: {
        baseURL: 'http://localhost:4700'
    }
};

export default config;