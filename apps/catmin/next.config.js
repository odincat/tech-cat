/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["advanced-cl", "pacman"]);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/dash/post/@:userName(@[a-zA-Z0-9]+)/:slug*',
        destination: "/user/:userName/:slug*",
      }
    ]
  }
});
