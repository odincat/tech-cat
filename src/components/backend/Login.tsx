import { CButton } from '@components/ui/Button';
import { CInput } from '@components/ui/Input';
import { trpc } from '@lib/trpc';
import { NextComponent } from '@lib/types';
import { useAuthRedirect } from '@lib/utils';
import { createDictionary, useTranslation } from '@locales/utils';
import { css, styled } from '@stitches';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const signInDictionary = createDictionary({
    email: {
        de: 'Email-Adresse',
        en: 'email',
        required: {
            de: 'Email-Adresse ist erforderlich um dich zu identifizieren',
            en: 'Your email is required',
        }
    },
    password: {
        de: 'Passwort',
        en: 'password',
        minLength: {
            de: 'Dein Passwort ist mindestens 10 Zeichen lang',
            en: 'Your password is at least 10 characters long'
        },
        required: {
            de: 'Bitte gib dein Passwort ein',
            en: 'Please enter your password'
        }
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

export const Spacer = styled('span', {
    marginBottom: '3rem',
    display: 'block'
});

const signInField = css({
    width: '50% !important',
});

const signInButton = css({
    margin: 'auto'
});

export const ErrorMessage = styled('span', {
    color: '$red',
    fontWeight: 'bold',
    marginTop: '10px',
    display: 'block'    
});

interface SignInForm {
    email: string;
    password: string;
}

const SignIn: NextComponent = () => {
    const signInContract = trpc.auth.login.useMutation(); 

    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignInForm>();

    const { translateString } = useTranslation();
    const authRedirect = useAuthRedirect();

    useEffect(() => {
        if (signInContract.data) {
            // User has successfully signed in
            authRedirect();
        }
    }, [signInContract.data, authRedirect]);

    const handleSignIn: SubmitHandler<SignInForm> = (data) => {
        signInContract.mutate({
            email: data.email,
            password: data.password,
            userAgent: navigator.userAgent
        });

        // TODO: Confirmation message / toast
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(handleSignIn)}>
                <CInput
                    autoFocus
                    type='email'
                    containerClass={signInField()}
                    placeholder={translateString(signInDictionary.email)}
                    {...register('email', { required: true })}/>
                {errors.email?.type === 'required' && <ErrorMessage>{translateString(signInDictionary.email.required)}</ErrorMessage>}

                <br />

                <CInput
                    type='password'
                    containerClass={signInField()}
                    placeholder={translateString(signInDictionary.password)}
                    {...register('password', { required: true, minLength: 10 })}/>
                {errors.password?.type === 'minLength' && <ErrorMessage>{translateString(signInDictionary.password.minLength)}</ErrorMessage>}
                {errors.password?.type === 'required' && <ErrorMessage>{translateString(signInDictionary.password.required)}</ErrorMessage>}

                <Spacer />

                {signInContract.error && (
                    <ErrorMessage>{signInContract.error.message}</ErrorMessage>
                )}  
                
                <CButton
                    className={signInButton()}
                    color='green'
                    type='submit'
                    >
                    {translateString(signInDictionary.signIn)}
                </CButton>
            </form>
        </Container>
    );
};

export default SignIn;
