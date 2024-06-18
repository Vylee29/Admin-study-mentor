import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            // Add type annotation to _key parameter
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            // Add type annotation to _key parameter and 'value' parameter
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            // Add type annotation to _key parameter
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export default storage;
