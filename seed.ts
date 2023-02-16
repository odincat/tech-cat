#!/usr/bin/env node
import 'dotenv/config';
import { hashPassword } from "@lib/auth/auth";
import { randCompanyName, randEmail, randFirstName, randFullName, randSkill, randSlug, randUrl, randUserName } from '@ngneat/falso';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({
    log: ['error']
});

const sleep = (s = 2) => new Promise((r) => setTimeout(r, s * 1000));
const logChange = (added: string) => console.log(`\x1b[36m[ADD] Added \x1b[37m${added} \x1b[36mto database\x1b[0m`);
const logError = (added: string, error: string) => console.log(`\x1b[31m[ERROR] Unable to add \x1b[37m${added} \x1b[31mto database (Error: ${error})\x1b[0m`);
const userPassword = process.env.LOCAL_ACCOUNTS_PASSWORD ?? '12345678910';

const logUsefulData = async () => {
    console.log('\x1b[34m[INFO] Useful data:\x1b[0m');
    const adminUser = await db.user.findFirst({
        where: {
            role: 'ADMIN'
        }
    });

    const authorUser = await db.user.findFirst({
        where: {
            role: 'AUTHOR'
        }
    });

    const friendUser = await db.user.findFirst({
        where: {
            role: 'FRIEND'
        }
    });

    const regularUser = await db.user.findFirst({
        where: {
            role: 'USER',
            emailVerified: true
        }
    });

    const shortLink = await db.shortLink.findFirst({
        where: {}
    });

    console.log(`\x1b[36mAdmin user - Email: \x1b[37m${adminUser?.email} \x1b[36mPassword: \x1b[37m${userPassword}\x1b[0m`);
    console.log(`\x1b[36mAuthor user - Email: \x1b[37m${authorUser?.email} \x1b[36mPassword: \x1b[37m${userPassword}\x1b[0m`);
    console.log(`\x1b[36mFriend user - Email: \x1b[37m${friendUser?.email} \x1b[36mPassword: \x1b[37m${userPassword}\x1b[0m`);
    console.log(`\x1b[36mRegular user - Email: \x1b[37m${regularUser?.email} \x1b[36mPassword: \x1b[37m${userPassword}\x1b[0m`);
    console.log(`\x1b[36mShortlink - Slug: \x1b[37m${shortLink?.slug} \x1b[36mURL: \x1b[37m${shortLink?.url}\x1b[0m`);
}

const checkDb = async () => {
    var isEmpty = true;

    if ((await db.passwordReset.count()) !== 0) isEmpty = false;
    if ((await db.session.count()) !== 0) isEmpty = false;
    if ((await db.shortLink.count()) !== 0) isEmpty = false;
    if ((await db.user.count()) !== 0) isEmpty = false;

    if(isEmpty === false) {
        console.log();
        console.log('\x1b[31m[ERROR] Database is not empty, exposing data...\x1b[0m');
        console.log();
        await logUsefulData();
        console.log();
        process.exit(1);
    }
}

const seed = async () => {
    // --- Add example users ---
    await db.user.createMany({
        data: [
            // --- User with no role, but an verified email ---
            { name: randFullName(), username: randUserName(), email: randEmail(), hashedPassword: await hashPassword(userPassword), emailVerified: true, bio: `Working @${randCompanyName()} I'm really good at ${randSkill()}`, photoUrl: `https://avatars.dicebear.com/api/bottts/${randFirstName()}.png` },
            // --- User with no role, but an unverified email ---
            { name: randFullName(), username: randUserName(), email: randEmail(), hashedPassword: await hashPassword(userPassword), emailVerified: false, bio: `Working @${randCompanyName()} I'm really good at ${randSkill()}`, photoUrl: `https://avatars.dicebear.com/api/bottts/${randFirstName()}.png` },
            // --- User with FRIEND Role and an verified email ---
            { name: randFullName(), username: randUserName() ,email: randEmail(), hashedPassword: await hashPassword(userPassword), emailVerified: true, role: 'FRIEND', bio: `Working @${randCompanyName()} I'm really good at ${randSkill()}`, photoUrl: `https://avatars.dicebear.com/api/bottts/${randFirstName()}.png` },
            // --- User with AUTHOR role and an verified email ---
            { name: randFullName(), username: randUserName(), email: randEmail(), hashedPassword: await hashPassword(userPassword), emailVerified: true, role: 'AUTHOR', bio: `Working @${randCompanyName()} I'm really good at ${randSkill()}`, photoUrl: `https://avatars.dicebear.com/api/bottts/${randFirstName()}.png` },
            // --- User with ADMIN role and an verified email. ---
            { name: randFullName(), username: randUserName(), email: randEmail(), hashedPassword: await hashPassword(userPassword), emailVerified: true, role: 'ADMIN', bio: `Working @${randCompanyName()} I'm really good at ${randSkill()}`, photoUrl: `https://avatars.dicebear.com/api/bottts/${randFirstName()}.png` },
        ]
    }).then(() => {
        logChange('users');
    }).catch((error: any) => {
        logError('users', error);
    });
    // --- END: Add example users ---

    // --- Add some shortlinks ---
    for(var i = 0; i < 20; i++){
        await db.shortLink.create({
            data: {
                slug: randSlug(),
                url: randUrl()
            }
        }).then(() => {
            logChange('shortlink');
        }).catch((error: any) => {
            logError('shortlink', error);
        });
    }
    // --- END: Add some shortlinks ---
};

// Execution starts here

const main = async () => {
    await checkDb();

    console.log('\x1b[41m==========================================================\x1b[0m');
    console.log('\x1b[31mWARNING: This script will modify your database. Make sure you are not using a database that stores production data or that already has been seeded\x1b[0m');
    console.log('\x1b[41m==========================================================\x1b[0m');
    console.log();

    await sleep(5);

    console.log('\x1b[34mSeeding...\x1b[0m');
    console.log();

    await seed();

    console.log();
    console.log('\x1b[32m ✓ Successfully seeded database!\x1b[0m');

    console.log();
    await logUsefulData();
    console.log();
};

main();