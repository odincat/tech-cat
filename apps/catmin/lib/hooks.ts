import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import fire from 'pacman/firebase';

export const useUserData = () => {
    const [user] = useAuthState(fire.useAuth());
    const [userObject, setUserObject] = useState(null);
    const [roles, setRoles] = useState(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        setFetching(true);
        let unsubscribe;
        
        if(!user) {
            setFetching(false);
            return;
        }

        const ref = collection(fire.useFireStore(), 'users');
        const userDoc = doc(ref, user?.uid);

        unsubscribe = onSnapshot(userDoc, (doc) => {
            //@ts-ignore
            setUserObject(doc.data());
        });

        const userCollection = collection(fire.useFireStore(), 'users');
        const userDocument = doc(userCollection, user?.uid);
        const roleCollection = collection(userDocument, 'roles');
        const roleDocument = doc(roleCollection, user?.uid);

        unsubscribe = onSnapshot(roleDocument, (doc) => {
            //@ts-ignore
            setRoles(doc.data());
        });

        setFetching(false);

        return unsubscribe;
    }, [user]);

    return { user, userObject, roles, fetching };
};

