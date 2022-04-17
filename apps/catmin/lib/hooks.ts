import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from './firebase';

export const useUserData = () => {
    const [user] = useAuthState(auth);
    const [userObject, setUserObject] = useState(null);
    const [roles, setRoles] = useState(null);

    useEffect(() => {
        let unsubscribe;

        if(!user) return;

        const ref = collection(firestore, 'users');
        const userDoc = doc(ref, user?.uid);

        unsubscribe = onSnapshot(userDoc, (doc) => {
            //@ts-ignore
            setUserObject(doc.data());
        });

        const userCollection = collection(firestore, 'users');
        const userDocument = doc(userCollection, user?.uid);
        const roleCollection = collection(userDocument, 'roles');
        const roleDocument = doc(roleCollection, user?.uid);

        unsubscribe = onSnapshot(roleDocument, (doc) => {
            //@ts-ignore
            setRoles(doc.data());
        });

        return unsubscribe;
    });

    return { user, userObject, roles };
};

