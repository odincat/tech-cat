import styles from '@styles/Index.module.scss'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/dash/post/overview');
    }, [])

    return null;
};

export default Index;
