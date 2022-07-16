import SignUp from '@components/backend/SignUp';
import { Shell } from '@components/Shell';
import { NextComponent } from '@lib/types';
import { createDictionary, useTranslation } from '@locales/utils';
import { css, styled } from '@stitches';
import Link from 'next/link';
import { FaUserPlus } from 'react-icons/fa';

const signupPageDictionary = createDictionary({
    windowTitle: {
        de: 'Registrierung',
        en: 'Sign up',
    },
    heading: {
        de: 'Registrierung',
        en: 'Sign up',
        moreInfo: {
            de: 'Registriere dich um kommentieren zu können oder auf einzigartige, noch nie dagewesene, Funktionen zuzugreifen.',
            en: 'Sign up to be able to comment on articles or access to the unique and never found features.',
        },
    },
    alreadyHaveAnAccount: {
        de: <Link href='/auth/login'>Hast du bereits ein Konto?</Link>,
        en: <Link href='/auth/login'>Already have an account?</Link>
    }
});

const Container = styled('div', {
    textAlign: 'center',
});

const icon = css({
    verticalAlign: 'top',
});

const Register: NextComponent = () => {
    const { translateString } = useTranslation();

    return (
        <Shell alignCenter title={translateString(signupPageDictionary.windowTitle)}>
            <Container>
                <h2>
                    <FaUserPlus className={icon()} />{' '}
                    {translateString(signupPageDictionary.heading)}
                </h2>
                <p>
                    {translateString(signupPageDictionary.heading.moreInfo)} <br />
                    {translateString(signupPageDictionary.alreadyHaveAnAccount)}
                </p>
                <br />
                <SignUp />
            </Container>
        </Shell>
    );
};

export default Register;
