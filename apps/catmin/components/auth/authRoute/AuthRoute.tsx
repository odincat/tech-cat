import styles from './AuthRoute.module.scss'
import { useUser } from '@lib/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AuthRoute = ({ children }: any) => {
    const { user, roles, fetching } = useUser();
    const [locked, setLocked] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if(!fetching) {
            if( user ) {
                if(roles?.admin) {
                    setLocked(false);
                }
            } else if(user == null) {
                setLocked(true);
                console.log('nah')
            }
        }
    }, [user, roles]);

    return (
        <>
            {!locked ? (
                children
            ) : null}
        </>
    );
};

export default AuthRoute;