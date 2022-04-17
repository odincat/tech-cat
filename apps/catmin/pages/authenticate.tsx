import LoginForm from "@components/auth/Login";
import { Button } from "@mantine/core";
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