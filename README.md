# TechCat (blog & portfolio)

## Techstack
**What technologies have been used to build this project?**

![Techstack burger](https://raw.githubusercontent.com/odincat/tech-cat/main/public/techstack.png)

Burger image https://www.thesoftwareguild.com/blog/build-your-own-technology-stack/

In detail:
### Backend layer
Database: [MySQL](https://www.mysql.com/)

Email Service: [SendGrid](https://sendgrid.com/)

Email verification: [JWT](https://jwt.io/)

Session management: [iron-session](https://github.com/vvo/iron-session)

Validation: [zod](https://zod.dev/)

### API layer
Typesafe API endpoints: [tRPC](https://trpc.io/)

ORM: [Prisma](https://www.prisma.io/)

### Frontend layer
Meta-Framework: [Next.js](https://nextjs.org/)

Styling(CSS-in-Js): [stitches](https://stitches.dev/)

Icons: [react-icons](https://react-icons.github.io/react-icons/)

## Contributing
**How can I contribute to this project?**

Generally speaking, contributions are more than welcome! So if you spot a nasty bug, or you have a suggestion for a new feature, please open an issue or create a pull request.

PRs will be merged, but make sure you...:
- ... write new tests / adjust existing tests for the changes you make
- ... don't mess up the code style (4 spaces etc.). You can just run `pnpm prettier` just to be safe

If a PR is denied, then I will try to make the reason as clear as possible, that way the PR can be improved.

### Local development
Requirements:
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`): A BLAZINGLY fast, disk space efficient package manager
- [NodeJs](https://nodejs.org/en/) (^16)
- [Docker](https://www.docker.com/) Used for firing up the local database, if you prefer to use something different (e.g. MAMP), you don't need docker.

1. Clone the repository (or your fork)
2. Run `pnpm install` to install all dependencies.
3. Copy the `.env.example` file to `.env` and fill in the values.
4. Make sure that your database is running and reachable and run `pnpm dlx prisma db push` to push the existing schema to the database and generate the client.
5. Run `pnpm dev`

You are done and should be able to open up http://localhost:7000 in your browser.
