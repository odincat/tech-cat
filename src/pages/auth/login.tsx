import SignIn from '@components/backend/Login';
import { Shell } from '@components/Shell';
import { NextComponent } from '@lib/types';
import { createDictionary, useTranslation } from '@locales/utils';
import Link from 'next/link';

const loginPageDictionary = createDictionary({
    title: {
        de: 'Anmeldung',
        en: 'Login',
    },
    createAccount: {
        de: <Link href='/auth/register'>Noch kein Konto?</Link>,
        en: <Link href='/auth/register'>Don&apos;t have an account?</Link>
    }
});

const Login: NextComponent = () => {
    const { translateString } = useTranslation();

    return (
        <Shell alignCenter>
            <h2>{translateString(loginPageDictionary.title)}</h2>
            {translateString(loginPageDictionary.createAccount)}
            <br />
            <SignIn />
        </Shell>
    );
};

export default Login;
