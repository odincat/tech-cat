/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['advanced-cl', 'pacman']);

module.exports = withTM({
    reactStrictMode: true,
    swcMinify: true,
    swcLoader: true,
    
    i18n: {
        locales: ['de', 'en'],
        defaultLocale: 'de'
    }
});
