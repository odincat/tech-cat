import { advancedConsoleLog } from 'advanced-cl';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseLogger = new advancedConsoleLog('Firebase', '#ffcb2d');

const prodConfig = {
    apiKey: "AIzaSyD_g3M2k0woVFJ56-FuEaPjk1BiYtuRn40",
    authDomain: "tech-cat.firebaseapp.com",
    projectId: "tech-cat",
    storageBucket: "tech-cat.appspot.com",
    messagingSenderId: "741441122693",
    appId: "1:741441122693:web:0e38208a4af8484846d4ec"
};

const devConfig = {
    apiKey: "AIzaSyB5lMhQdr5Q-8f6EYa-cR2gL0vDypUb8mM",
    authDomain: "tech-cat-devnet.firebaseapp.com",
    projectId: "tech-cat-devnet",
    storageBucket: "tech-cat-devnet.appspot.com",
    messagingSenderId: "815597031106",
    appId: "1:815597031106:web:018f22c14baeeefa02755b"
};


var firebaseApp;

if(!getApps.length) {
    if(process && process.env.NODE_ENV === 'development' || 'test') {
        firebaseLogger.initialize();
        firebaseLogger.log('Loading Firebase...', 'information');
        firebaseApp = initializeApp(devConfig);
        firebaseLogger.log('Using Devnet, edited data may not be preserved', 'warning');
        firebaseLogger.log('Loaded Firebase (' + devConfig.authDomain + ')', 'sucess');
    } else {
        firebaseLogger.log('Loading Firebase...', 'information');
        firebaseApp = initializeApp(prodConfig);
        firebaseLogger.log('Loaded Firebase (' + prodConfig.authDomain + ')', 'sucess');
    }
}

export const auth = getAuth(firebaseApp);
export const authProvider = new GoogleAuthProvider();

export const firestore = getFirestore(firebaseApp);