import { CButton } from '@components/ui/Button';
import { CInput } from '@components/ui/Input';
import { NextComponent } from '@lib/types';
import { useAuthRedirect } from '@lib/utils';
import { createDictionary, useTranslation } from '@locales/utils';
import { trpc } from '@lib/trpc';
import { css, styled } from '@stitches';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage, Spacer } from './Login';

const signInDictionary = createDictionary({
    name: {
        de: 'Name',
        en: 'Name',
        required: {
            de: 'Dein Name ist erforderlich',
            en: 'Your name is required',
        }
    },
    username: {
        de: 'Benutzername',
        en: 'Username',
        required: {
            de: 'Aber aber, Sie brauchen doch einen Benutzernamen!',
            en: 'A username is required'
        }
    },
    email: {
        de: 'Email-Adresse',
        en: 'Email',
        required: {
            de: 'Email-Adresse wird benötigt, wie will man dich sonst wiedererkennen?!',
            en: 'Email is required'
        },
        pattern: {
            de: 'Das sieht mir nicht nach einer validen Emailadresse aus :/',
            en: 'Please enter a valid email address'
        }
    },
    password: {
        de: 'Passwort',
        en: 'Password',
        confirm: {
            de: 'Passwort bestätigen',
            en: 'Confirm password',
            required: {
                'de': 'Bitte bestätige dein Passwort',
                'en': 'Please confirm your password'
            },
            match: {
                de: 'Bitte stelle sicher, dass beide Passwörter übereinstimmen',
                en: 'Please make sure that both passwords match',
            }
        },
        required: {
            de: 'Password ist erforderlich',
            en: 'Password is required',
        },
        minLength: {
            de: 'Dein Passwort muss mindestens 10 Zeichen lang sein',
            en: 'Your password must be at least 10 characters long',
        }
    },
    signUp: {
        de: 'Konto erstellen',
        en: 'Sign up',
    }
});

const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
});

const signInField = css({
    width: '50% !important',
});

const signInButton = css({
    margin: 'auto',
});

interface SignUpForm {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp: NextComponent = () => {
    const signUpContract = trpc.auth.register.useMutation();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpForm>();
    const { ts } = useTranslation();
    const authRedirect = useAuthRedirect();


    useEffect(() => {
        if (signUpContract.data) {
            authRedirect();
        }
    }, [signUpContract.data, authRedirect]);

    const handleSingUp: SubmitHandler<SignUpForm> = (data) => {
        signUpContract.mutate({
            name: data.name,
            email: data.email,
            password: data.password,
            userAgent: navigator.userAgent,
            username: data.username
        });
    }

    return (
        <Container>
            <form id='sign-up' onSubmit={handleSubmit(handleSingUp)}>
                <CInput
                    autoFocus
                    containerClass={signInField()}
                    placeholder={ts(signInDictionary.name)}
                    {...register('name', { required: true})}
                />
                {errors.name?.type === 'required' && <ErrorMessage>{ts(signInDictionary.name.required)}</ErrorMessage>}
                <br />

                <CInput
                    autoFocus
                    containerClass={signInField()}
                    placeholder={ts(signInDictionary.username)}
                    {...register('username', { required: true})}
                />
                {errors.name?.type === 'required' && <ErrorMessage>{ts(signInDictionary.username.required)}</ErrorMessage>}
                <br />

                <CInput
                    autoFocus
                    type='email'
                    containerClass={signInField()}
                    placeholder={ts(signInDictionary.email)}
                    {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }) }
                />
                {errors.email?.type === 'required' && <ErrorMessage>{ts(signInDictionary.email.required)}</ErrorMessage>}
                {errors.email?.type === 'pattern' && <ErrorMessage>{ts(signInDictionary.email.pattern)}</ErrorMessage>}
                <br />

                <CInput
                    type='password'
                    containerClass={signInField()}
                    placeholder={ts(signInDictionary.password)}
                    {...register('password', { required: true, minLength: 10 }) }
                />
                {errors.password?.type === 'required' && <ErrorMessage>{ts(signInDictionary.password.required)}</ErrorMessage>}
                {errors.password?.type === 'minLength' && <ErrorMessage>{ts(signInDictionary.password.minLength)}</ErrorMessage>}
                <br />

                <CInput
                    type='password'
                    containerClass={signInField()}
                    placeholder={ts(signInDictionary.password.confirm)}
                    {...register('confirmPassword', { required: true, minLength: 10, validate: (value) => {
                        return value === watch('password')}
                    })}/>
                {errors.confirmPassword?.type === 'required' && <ErrorMessage>{ts(signInDictionary.password.confirm.required)}</ErrorMessage>}
                {errors.confirmPassword?.type === 'validate' && <ErrorMessage>{ts(signInDictionary.password.confirm.match)}</ErrorMessage>}
                <br />
                
                <Spacer />
                
                {signUpContract.error && (
                    <ErrorMessage>{signUpContract.error.message}</ErrorMessage>
                )}

                <CButton
                    type='submit'
                    className={signInButton()}
                    color='green'>
                    {ts(signInDictionary.signUp)}
                </CButton>
        </form>
        </Container>
    );
};

export default SignUp;
