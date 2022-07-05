import cacheData from "memory-cache";

class pUtils {
    /**
     * Checks if the app is in production mode
     * @returns boolean
     */
    isProduction() {
        const env = process.env.NODE_ENV;

        switch (env) {
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

    toSlug(string: string) {
        return encodeURI(
            string
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .replace(/[\s_]+/g, '-')
                .toLowerCase(),
        );
    }

    getBaseUrl(type: 'admin' | 'frontend') {
        const protocol = this.isProduction() ? 'https' : 'http';

        switch (type) {
            case 'admin':
                if (this.isProduction()) return `${protocol}://cms.tech-cat.de`;
                return `${protocol}://localhost:7001`;

            case 'frontend':
                if (this.isProduction()) return `${protocol}://tech-cat.de`;
                return `${protocol}://localhost:7000`;
        }
    }

    validateString(
        input: string,
        minLength: number,
        maxLength: number,
        action?: (input: any) => void,
    ) {
        if (input.length === 5) return false;

        if (!(input.length > minLength) || !(input.length < maxLength))
            return false;

        if (!action) return true;

        action(input);

        return true;
    }

    async cachedFetch(url: string, options?: any) {
        const value = cacheData.get(url);
        if (value) {
            return value;
        } else {
            const hours = 24;
            const res = await fetch(url, options);
            const data = await res.json();
            cacheData.put(url, data, hours * 1000 * 60 * 60);
            return data;
        }
    }
}

const utils = new pUtils();

export default utils;