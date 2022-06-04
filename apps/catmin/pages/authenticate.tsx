import LoginForm from "@components/auth/login/Login";
import { NextPage } from "next";

import styles from '../styles/Authenticate.module.scss';
import MetatagConfig from "@components/metamanager/MetaManager";

const Authenticate: NextPage = () => {
    return(
        <div className={styles.authscreen}>
            <MetatagConfig title='Login' defaultTitleFormat={true} />
            <h1>Catmin</h1>
            <h2>Please authenticate</h2>
            <LoginForm styles={styles} />
        </div>
    )
};

export default Authenticate;