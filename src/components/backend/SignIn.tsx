import { PASSWORD_MIN_LENGTH } from '@backend/routers/auth';
import { TButton } from '@components/ui/Button';
import { TInput } from '@components/ui/Input';
import { trpc } from '@lib/trpc';
import { NextComponent } from '@lib/types';
import { createDictionary, useTranslation } from '@locales/utils';
import { css, styled } from '@stitches';
import { createRef, SetStateAction, useEffect, useRef, useState } from 'react';

const signInDictionary = createDictionary({
    email: {
        de: 'Email-Adresse',
        en: 'email'
    },
    password: {
        de: 'Passwort',
        en: 'password'
    },
    signIn: {
        de: 'Anmelden',
        en: 'Sign in'
    }
});

const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column'
})

const Spacer = styled('span', {
    marginBottom: '3rem'
});

const signInField = css({
    width: '50% !important'
});

const signInButton = css({
    margin: 'auto'
});


const SignIn: NextComponent = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [passwordValid, setPasswordValid] = useState(false);

    const { translateString } = useTranslation();

    const signInProcess = trpc.useMutation('auth.login');

    const handleClick = () => {
        signInProcess.mutate({
            email: email,
            password: password
        });
    };

    useEffect(() => {
        if(!password) return;
        if(password?.length < PASSWORD_MIN_LENGTH) {
            setPasswordValid(false);
        }
    }, [email, password]);

    return (
        <Container>
            <TInput autoFocus value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}} containerClass={signInField()} placeholder={translateString(signInDictionary.email)} />
            <br />
            <TInput value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}} containerClass={signInField()} placeholder={translateString(signInDictionary.password)} />
            <Spacer />
            <TButton onClick={handleClick} disabled={!passwordValid} className={signInButton()} color='green'>{translateString(signInDictionary.signIn)}</TButton>
        </Container>
    );
};

export default SignIn;
