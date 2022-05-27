/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["advanced-cl", "pacman"]);

module.exports = withTM({
  // React strict mode causes components to render twice, 2 editor instances will be spawned
  reactStrictMode: false,
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
