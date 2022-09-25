import { verifyPassword } from "@lib/auth/auth";
import test, { expect } from "@playwright/test";
import { PrismaClient } from "@prisma/client";
import { db } from "@server/utils/db-client";

const account = {
    email: 'test@example.com',
    name: 'Test Account',
    bio: 'Have fun testing!',
    photoUrl: 'https://placekitten.com/500/500',
    username: 'test',
    rawPassword: '12345678910'
};

test('Create a new account', async ({ page }) => {
    const user = await db.user.findUnique({
        where: {
            email: account.email
        }
    });

    // if(user) {
    //     await db.user.delete({
    //         where: {
    //             email: account.email,
    //             username: account.username
    //         }
    //     });
    // }

    await page.goto('/auth/register');

    const form = page.locator('#sign-up');

    await form.locator('[name="name"]').fill(account.name);
    await form.locator('[name="username"]').fill(account.username);
    await form.locator('[name="email"]').fill(account.email);
    await form.locator('[name="password"]').fill(account.rawPassword);
    await form.locator('[name="confirmPassword"]').fill(account.rawPassword);

    await form.locator('[type="submit"]').click();
});

test('Data is matching', async ({ page }) => {
    const testAccount = await db.user.findUniqueOrThrow({
        where: {
            email: account.email
        }
    });

    if(!testAccount) test.fail();

    console.log(testAccount)

    expect(testAccount.bio).toEqual(account.bio);
    expect(testAccount.name).toEqual(account.name);
    expect(testAccount.username).toEqual(account.username);    

    // const passwordIsValid = await verifyPassword(testAccount.hashedPassword, account.rawPassword);
    // await expect(passwordIsValid).toBe(true);
})