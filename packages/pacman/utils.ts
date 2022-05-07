import { browserLocalPersistence } from ".pnpm/@firebase+auth@0.19.11_@firebase+app@0.7.20/node_modules/@firebase/auth";

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
}

const utils = new pUtils();

export default utils;