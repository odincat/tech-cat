import { UserContext } from '@lib/context';
import { openSpotlight } from '@mantine/spotlight';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { RiDashboard2Fill, RiMenuFill, RiQuillPenLine, RiShieldUserFill, RiStackLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { GLOBAL_statusMessage, useStore } from '@lib/store';

const Navbar = () => {
    const { userObject, roles } = useContext(UserContext);
    const router = useRouter();
    const globalMessage = useStore(GLOBAL_statusMessage);

    const dynamicRoute = useRouter().asPath;

    useEffect(() => {
        globalMessage.set('');
    }, [dynamicRoute]);

    return(
        <div className={styles.navbar}>
            <Link href="/dash"><a className={styles.todash}>
            <div className={styles.brand}><span className={styles.logo}><RiDashboard2Fill /></span> Catmin</div>
            </a></Link>

            <div className={styles.actions}>
                <span className={styles.actionview} onClick={() => router.push('/dash/post/overview')}><RiStackLine /> View posts</span>
                <span className={styles.actioncreate} onClick={() => router.push('/dash/post/new')}><RiQuillPenLine /> Create post</span>
            </div>

            <div className={styles.message}>{globalMessage.get() ?? ' '}</div>
            {roles?.admin && <div className={styles.user}><RiShieldUserFill /> authenticated as <span className={styles.name}>{userObject?.username}</span></div>}
            <div onClick={openSpotlight} className={styles.menu}><RiMenuFill /></div>
        </div>
    );
};

export default Navbar;