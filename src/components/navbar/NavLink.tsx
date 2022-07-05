import { NextComponent } from '@lib/types';
import { CSS } from '@stitches/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkArgs {
    target: string;
    displayName: string;
    className?: string | CSS;
    activeClassSelector: ActiveClassSelector;
}

export type ActiveClassSelector = 'exact' | 'contains' | 'containsexact';

export const NavLink: NextComponent<NavLinkArgs> = ({
    target,
    displayName,
    className,
    activeClassSelector,
}) => {
    const router = useRouter();

    const assignActiveClassname = () => {
        const activeClassName: string = 'active';

        switch (activeClassSelector) {
            case 'exact':
                if (router.pathname === target) return activeClassName;
                break;
            case 'contains':
                if (router.pathname.includes(target)) return activeClassName;
                break;
            case 'containsexact':
                var matches: boolean = false;
                const path = router.pathname.split('/');
                const routeTarget = target.split('/');

                // console.log('path: ' + path2);
                // console.log('route target: ' + routeTarget)

                path.forEach((item, index) => {
                    if (index == 0) return;
                    console.log(item + ' =' + routeTarget[index]);

                    if (item === routeTarget[index]) {
                        matches = true;
                        return;
                    }
                });

                if (!matches) return;

                return activeClassName;
            default:
                return '';
        }
    };

    const isActive = assignActiveClassname();

    return (
        <Link href={target} passHref>
            <a className={`${className} ${isActive ?? ''}`}>{displayName}</a>
        </Link>
    );
};
