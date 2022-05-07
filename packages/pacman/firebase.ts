import { initializeApp, getApps } from 'firebase/app';
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { advancedConsoleLog } from 'advanced-cl';

import utils from './utils';

export interface firebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

class pFirebase {
    // Advanced Console log instance
    logger: any;

    private config: firebaseConfig;
    private firebaseApp: any;

    // Firebase features
    private auth;
    private authProvider;
    private firestore;
    private storage;

    constructor() {
        this.logger = new advancedConsoleLog('Firebase', '#ffcb2d');

        // It's fine to expose this, just restrict domains in the console. For development we use the local emulator suite.
        this.config = {
            apiKey: "AIzaSyD_g3M2k0woVFJ56-FuEaPjk1BiYtuRn40",
            authDomain: "tech-cat.firebaseapp.com",
            projectId: "tech-cat",
            storageBucket: "tech-cat.appspot.com",
            messagingSenderId: "741441122693",
            appId: "1:741441122693:web:0e38208a4af8484846d4ec"
        };

        if(!getApps().length) {
            this.firebaseApp = initializeApp(this.config);
        }

        this.auth = getAuth(this.firebaseApp);
        this.authProvider = new GoogleAuthProvider();

        this.firestore = getFirestore(this.firebaseApp);

        this.storage = getStorage(this.firebaseApp);
        
        if(!utils.isProduction()) {
            connectAuthEmulator(this.auth, 'http://localhost:9099', { disableWarnings: true });
            connectFirestoreEmulator(this.firestore, 'localhost', 9089);
            connectStorageEmulator(this.storage, 'localhost', 9079);
        }
    }

    // Yes the following code is kind of junk, but makes our final code a lot more readable
    public useAuth() { return this.auth }

    public useAuthProvider() { return this.authProvider }

    public useFireStore() { return this.firestore }

    public useStorage() { return this.storage }
}

const fire = new pFirebase();

export default fire;