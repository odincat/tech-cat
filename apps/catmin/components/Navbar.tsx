import { UserContext } from '@lib/context';
import { openSpotlight } from '@mantine/spotlight';
import styles from '@styles/Navbar.module.scss';
import Link from 'next/link';
import { useContext } from 'react';
import { RiDashboard2Fill, RiLock2Line, RiMenuFill, RiQuillPenLine, RiStackLine } from 'react-icons/ri';

const Navbar = () => {
    const { userObject, roles } = useContext(UserContext);

    return(
        <div className={styles.navbar}>
            <Link href="/dash"><a className={styles.todash}>
            <div className={styles.brand}><span className={styles.logo}><RiDashboard2Fill /></span> Catmin</div>
            </a></Link>

            <div className={styles.actions}><span className={styles.actionview}><RiStackLine /> View posts</span> <span className={styles.actioncreate}><RiQuillPenLine /> Create post</span></div>

            <div className={styles.end}></div>
            {roles?.admin && <div className={styles.user}><RiLock2Line /> authenticated as <span className={styles.name}>{userObject?.name}</span></div>}
            <div onClick={openSpotlight} className={styles.menu}><RiMenuFill /></div>
        </div>
    );
};

export default Navbar;