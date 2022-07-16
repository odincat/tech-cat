import { TButton } from '@components/ui/Button';
import { TInput } from '@components/ui/Input';
// import { useAuthRedirect } from '@lib/auth/auth';
import { trpc } from '@lib/trpc';
import { NextComponent } from '@lib/types';
import utils from '@lib/utils';
import { createDictionary, useTranslation } from '@locales/utils';
import { css, styled } from '@stitches';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const signInDictionary = createDictionary({
    email: {
        de: 'Email-Adresse',
        en: 'email',
    },
    password: {
        de: 'Passwort',
        en: 'password',
    },
    signIn: {
        de: 'Anmelden',
        en: 'Sign in',
    }
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
    margin: 'auto'
});

const ErrorMessage = styled('span', {
    color: '$red',
    fontWeight: 'bold',
});

const SignIn: NextComponent = () => {
    const signInContract = trpc.useMutation('auth.login');

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordValid, setPasswordValid] = useState(false);

    const { translateString } = useTranslation();
    const authRedirect = utils.useAuthRedirect();

    const handleClick = () => {
        if (!email || !password || !passwordValid) return;

        signInContract.mutate({
            email: email,
            password: password,
            userAgent: navigator.userAgent
        });
    };

    useEffect(() => {
        if (!password) return;

        setPasswordValid(password?.length > 10);
    }, [password]);

    useEffect(() => {
        if (signInContract.data) {
            authRedirect();
        }
    }, [signInContract.data]);

    return (
        <Container>
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
                placeholder={translateString(signInDictionary.password)}/>

            <Spacer />

            {signInContract.error && (
                <ErrorMessage>{signInContract.error.message}</ErrorMessage>
            )}
            

            <TButton
                onClick={handleClick}
                disabled={!passwordValid}
                className={signInButton()}
                color='green'>
                {translateString(signInDictionary.signIn)}
            </TButton>

        </Container>
    );
};

export default SignIn;
