import SignIn from '@components/backend/SignIn';
import { Shell } from '@components/Shell';
import { NextComponent } from '@lib/types';
import { createDictionary, useTranslation } from '@locales/utils';

const loginPageDictionary = createDictionary({
    title: {
        de: 'Anmeldung',
        en: 'Login',
    },
});

const Login: NextComponent = () => {
    const { translateString } = useTranslation();

    return (
        <Shell>
            <h2>{translateString(loginPageDictionary.title)}</h2>
            <br />
            <SignIn />
        </Shell>
    );
};

export default Login;
