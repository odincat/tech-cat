import { auth, firebaseLogger } from "@lib/firebase";
import { Button, Input } from "@mantine/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";
import { useEffect, useState } from "react";
import { FaEnvelopeOpenText, FaLock } from 'react-icons/fa';

const LoginForm = ({ styles }: any) => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleLogin = (e: any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, emailValue, passwordValue).then(() => {
            firebaseLogger.log('Successfully authenticated', 'sucess');
            setError(false);
            setSuccess(true);
            Router.push({
                pathname: '/dash'
            });
        }).catch(error => {
            firebaseLogger.log(error, 'error');
            setError(true);
        })
    };

    return(
        <form onSubmit={handleLogin} className={styles.loginform}>
            <Input value={emailValue} onChange={(e: any) => setEmailValue(e.target.value)} className={styles.logininput} icon={<FaEnvelopeOpenText />} placeholder="Email" type="email" />
            <Input value={passwordValue} onChange={(e: any) => setPasswordValue(e.target.value)} className={styles.logininput} icon={<FaLock />} placeholder="Password" type="password" />
            {error && (<div className={styles.error}>There was an error, please try again!</div>)}
            {success && (<div className={styles.success}>Login successful</div>)}
            <Button type="submit" onClick={handleLogin} className={styles.loginbutton} variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Login</Button>
        </form>
    );
};

export default LoginForm;