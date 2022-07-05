const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        'storybook-addon-root-attribute/register',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/preset-scss',
    ],
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-webpack5',
    },
    previewHead: (head) => `
        ${head}
    `,
    webpackFinal: async (config) => {
        config.resolve.plugins = config.resolve.plugins || [];

        config.resolve.plugins.push(new TsconfigPathsPlugin());

        return config;
    }
};
