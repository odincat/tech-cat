import { UserContext } from '@lib/context';
import { signInWithPopup } from 'firebase/auth';
import { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import fire from 'pacman/firebase';

const SignIn = () => {
    const signInWithGoogle = () => {
        signInWithPopup(fire.useAuth(), fire.useAuthProvider());
    };

    return (
        <>
            <button
                className='btn-fancy m-auto block'
                onClick={signInWithGoogle}>
                <FaGoogle /> Login with Google
            </button>
        </>
    );
};

export default SignIn;
