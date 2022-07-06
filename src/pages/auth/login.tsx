import SignIn from "@components/backend/SignIn";
import { NextComponent } from "@lib/types";
import { createDictionary, useTranslation } from "@locales/utils";

const loginPageDictionary = createDictionary({
    title: {
        de: 'Anmeldung',
        en: 'Login'
    }
});

const Login: NextComponent = () => {
    const { translateString } = useTranslation();
    return (<>
        <h2>{translateString(loginPageDictionary.title)}</h2>
        <br />
        <SignIn />
    </>);
}

export default Login;