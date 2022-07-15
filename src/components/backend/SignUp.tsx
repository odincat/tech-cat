import { TButton } from '@components/ui/Button';
import { TInput } from '@components/ui/Input';
// import { useAuthRedirect } from '@lib/auth/auth';
import { trpc } from '@lib/trpc';
import { NextComponent } from '@lib/types';
import utils from '@lib/utils';
import { createDictionary, useTranslation } from '@locales/utils';
import { css, styled } from '@stitches';
import { useEffect, useState } from 'react';

const signInDictionary = createDictionary({
    name: {
        de: 'Name',
        en: 'name',
    },
    email: {
        de: 'Email-Adresse',
        en: 'email',
    },
    password: {
        de: 'Passwort',
        en: 'password',
    },
    signUp: {
        de: 'Konto erstellen',
        en: 'Sign up',
    },
});

const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
});

const Spacer = styled('span', {
    marginBottom: '3rem',
});

const signInField = css({
    width: '50% !important',
});

const signInButton = css({
    margin: 'auto',
});

const ErrorMessage = styled('span', {
    color: '$red',
    fontWeight: 'bold',
});

const SignUp: NextComponent = () => {
    const signUpContract = trpc.useMutation('auth.register');

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordValid, setPasswordValid] = useState(false);

    const { translateString } = useTranslation();
    const authRedirect = utils.useAuthRedirect();

    const handleClick = () => {
        if (!email || !password || !passwordValid) return;

        signUpContract.mutate({
            name: name,
            email: email,
            password: password,
        });

        console.log(name);
        console.log(email);
        console.log(password);
    };

    useEffect(() => {
        if (!password) return;

        setPasswordValid(password?.length > 7);
    }, [password]);

    useEffect(() => {
        if (signUpContract.data) {
            authRedirect();
        }
    }, [signUpContract.data]);

    return (
        <Container>
            <TInput
                autoFocus
                type='email'
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                }}
                containerClass={signInField()}
                placeholder={translateString(signInDictionary.name)}
            />
            <br />
            <TInput
                autoFocus
                type='email'
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                }}
                containerClass={signInField()}
                placeholder={translateString(signInDictionary.email)}
            />
            <br />
            <TInput
                value={password}
                type='password'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                }}
                containerClass={signInField()}
                placeholder={translateString(signInDictionary.password)}
            />
            <Spacer />

            {signUpContract.error && (
                <ErrorMessage>{signUpContract.error.message}</ErrorMessage>
            )}

            <TButton
                onClick={handleClick}
                disabled={!passwordValid}
                className={signInButton()}
                color='green'>
                {translateString(signInDictionary.signUp)}
            </TButton>
        </Container>
    );
};

export default SignUp;
