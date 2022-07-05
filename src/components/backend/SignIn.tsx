// import { signInWithPopup } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
// import fire from 'pacman/firebase';
import { NextComponent } from '@lib/types';

const SignIn: NextComponent = () => {
    const signInWithGoogle = () => {
        // signInWithPopup(fire.useAuth(), fire.useAuthProvider());
    };

    return (
        <>
            <button onClick={signInWithGoogle}>
                <FaGoogle /> Login with Google
            </button>
        </>
    );
};

export default SignIn;
