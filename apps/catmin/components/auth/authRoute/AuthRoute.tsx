import styles from './AuthRoute.module.scss';
import { useUser } from '@lib/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AuthRoute = ({ children }: any) => {
    const { user, roles, fetching, userObject } = useUser();
    const [locked, setLocked] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!fetching) {
            if (!user) return;
            if (!roles?.admin) return;
            setLocked(false);
        }
    }, [user, roles]);

    return <>{!locked ? children : null}</>;
};

export default AuthRoute;
