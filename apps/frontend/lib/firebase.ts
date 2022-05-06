import { advancedConsoleLog } from 'advanced-cl';
import { initializeApp, getApps } from 'firebase/app';
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

export const firebaseLogger = new advancedConsoleLog('Firebase', '#ffcb2d');

const prodConfig = {
    apiKey: "AIzaSyD_g3M2k0woVFJ56-FuEaPjk1BiYtuRn40",
    authDomain: "tech-cat.firebaseapp.com",
    projectId: "tech-cat",
    storageBucket: "tech-cat.appspot.com",
    messagingSenderId: "741441122693",
    appId: "1:741441122693:web:0e38208a4af8484846d4ec"
};

var firebaseApp;

if(!getApps().length) {
    firebaseLogger.log('Loading Firebase...', 'information');
    firebaseApp = initializeApp(prodConfig);
    firebaseLogger.log('Loaded Firebase (' + prodConfig.authDomain + ')', 'sucess');
}

export const auth = getAuth(firebaseApp);
export const authProvider = new GoogleAuthProvider();

export const firestore = getFirestore(firebaseApp);

if(process && process.env.NODE_ENV === 'development' || 'test') {
    connectAuthEmulator(auth, 'localhost:9099');
    connectFirestoreEmulator(firestore, 'localhost', 9089);
}
