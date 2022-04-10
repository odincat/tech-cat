import { UserContext } from "@lib/context";
import { auth, authProvider } from "@lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";

const SignIn = () => {
    const signInWithGoogle = () => {
        signInWithPopup(auth, authProvider);
    };

    return (
        <>
        <button className="btn-fancy m-auto block" onClick={signInWithGoogle}>
            <FaGoogle /> Login with Google
        </button>
        </>
    );
};

export default SignIn;