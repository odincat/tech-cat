import LoginForm from "@components/auth/login/Login";
import { NextPage } from "next";

import styles from '../styles/Authenticate.module.scss';

const Authenticate: NextPage = () => {
    return(
        <div className={styles.authscreen}>
            <h1>Catmin</h1>
            <h2>Please authenticate</h2>
            <LoginForm styles={styles} />
        </div>
    )
};

export default Authenticate;