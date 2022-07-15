import { trpc } from '@backend/utils/trpc';
import { Shell } from '@components/Shell';
import { NextComponent } from '@lib/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login: NextComponent = () => {
    const logoutMutation = trpc.useMutation('auth.logout');
    const router = useRouter();

    useEffect(() => {
        logoutMutation.mutate();
        
        router.push('/auth/login');
    }, [])

    return <Shell title='Logging out...' />
};

export default Login;
