import fire from 'pacman/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useUserData = () => {
    const [user] = useAuthState(fire.useAuth());

    return { user };
};

