# TechCat - Portfolio + Blog

## Technologies

Project: [Turborepo](https://turborepo.org/)

Actual Backend (Database + Auth): [Firebase](https://firebase.google.com/)

Frontend: [NextJS](https://nextjs.org/), [Tailwind](https://tailwindcss.com/) (not used as heavily as it's supposed to)

Graphical Blog backend: [NextJS](https://nextjs.org/), [Mantine](https://mantine.dev/)

Deployment: [Vercel](https://vercel.com/) (Docker stuff will be implemented aswell)

Minor stuff:

-   AdvancedConsoleLog (local)

## Development

Requirements:

-   Modern version of NodeJS (16 should do the job)
-   Docker (Firebase emulators)

[PNPM](https://pnpm.io) is recommended.

1. In the root directory run `pnpm install`. This will take a second
   If you want to emulate the firebase instance you just need to run `pnpm run docker:start`. This will build the image and start the server.
2. Run `pnpm dev` in the root directory. This will launch both webapps.

## Build

unfinished
//TODO
