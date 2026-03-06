import PocketBase from 'pocketbase';

// The URL where your PocketBase executable is running
// Standard default is http://127.0.0.1:8090
const PB_URL = 'http://127.0.0.1:8090';

export const pb = new PocketBase(PB_URL);

// This helper is useful for Next.js Client Components
// to check if a user is currently logged in.
export const isUserLoggedIn = () => {
    return pb.authStore.isValid;
};