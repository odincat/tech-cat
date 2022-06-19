/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['advanced-cl', 'pacman']);

module.exports = withTM({
    reactStrictMode: true,
    swcMinify: true,
    swcLoader: true,
    webpack(config) {
        config.plugins.push(require('unplugin-auto-import/webpack')({
            include: [/\.[tj]sx?$/],
            dts: true,
            imports: [
                'react'
            ]
        }))

        return config;
    }
});
