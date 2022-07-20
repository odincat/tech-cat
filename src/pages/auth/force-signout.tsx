import { trpc } from '@server/utils/trpc';
import { Shell } from '@components/Shell';
import { NextComponent } from '@lib/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login: NextComponent = () => {
    const signOutMutation = trpc.useMutation('auth.signOut');
    const router = useRouter();

    useEffect(() => {
        signOutMutation.mutate();
        
        router.push('/auth/login');
    }, [router, signOutMutation])

    return <Shell title='Logging out...' />
};

export default Login;
