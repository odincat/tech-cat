import { Timestamp, serverTimestamp } from "firebase/firestore";

class pUtils {
    /**
     * Checks if the app is in production mode
     * @returns boolean
     */
    isProduction() {
        const env = process.env.NODE_ENV;

        switch(env) {
            case 'development':
            case 'test':
            return false;
            case 'production':
            default:
            return true;
        }
    }

    entryToJson(document: any) {
        const data = document.data();
        return {
            ...data,
            createdAt: data.createdAt.toMillis(),
            updatedAt: data.updatedAt.toMillis(),
        };
    }

    fromMillis = Timestamp.fromMillis;
    
    serverTimestamp = serverTimestamp();
}

const utils = new pUtils();

export default utils;