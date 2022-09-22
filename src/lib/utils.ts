import { Role } from '@prisma/client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const toSlug = (string: string) => {
    return encodeURI(
        string
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase(),
    );
};

export const isPermitted = (requiredRole: Role, currentRole: Role) => {
    switch (requiredRole) {
        case 'ADMIN':
            return currentRole === 'ADMIN';
        case 'AUTHOR':
            return currentRole === 'ADMIN' || currentRole === 'AUTHOR';
        case 'FRIEND':
            return currentRole === 'ADMIN' || currentRole === 'AUTHOR' || currentRole === 'FRIEND';
        case 'USER':
            return currentRole === 'ADMIN' || currentRole === 'AUTHOR' || currentRole === 'FRIEND' || currentRole === 'USER';
        default:
            return false;
    }
};


export const useAuthRedirect = () => {
    const router = useRouter();

    return useCallback(() => {
        router.push((router.query.redirect as string) ?? '/');
    }, [router]);
}