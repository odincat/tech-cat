module.exports = {
  extends: "next/core-web-vitals",
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "@next/next/no-sync-scripts": "off",
    "@next/next/no-img-element": "off"
  },
};