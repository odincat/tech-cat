import SignUp from '@components/backend/SignUp';
import { Shell } from '@components/Shell';
import { NextComponent } from '@lib/types';
import { createDictionary, useTranslation } from '@locales/utils';
import { css, styled } from '@stitches';
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
            de: 'Registiere dich um kommentieren zu können oder auf die einzigartigen, noch nie erfundenen, Funktionen zuzugreifen.',
            en: 'Sign up to be able to comment on articles or access to the unique and never found features.',
        },
    },
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
        <Shell title={translateString(signupPageDictionary.windowTitle)}>
            <Container>
                <h2>
                    <FaUserPlus className={icon()} />{' '}
                    {translateString(signupPageDictionary.heading)}
                </h2>
                <div>
                    {translateString(signupPageDictionary.heading.moreInfo)}
                </div>
                <br />
                <SignUp />
            </Container>
        </Shell>
    );
};

export default Register;
