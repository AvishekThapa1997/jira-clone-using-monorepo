import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = getApps()[0] ?? initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// // TODO : How to handle failure in lazy loading of firestore
const getFirestore = () =>
  import('firebase/firestore').then(({ getFirestore, ...remaining }) => ({
    firestore: getFirestore(app),
    ...remaining,
  }));

// // TODO : How to handle failure in lazy loading of storage
const getStorage = () =>
  import('firebase/storage').then(({ getStorage, ref, ...remaining }) => {
    const storage = getStorage(app);
    return {
      storage,
      ref,
      ...remaining,
    };
  });

const getFunctions = () =>
  import('firebase/functions').then(({ getFunctions, ...remaining }) => {
    const firebaseFunction = getFunctions(app);
    return {
      firebaseFunction,
      ...remaining,
    };
  });
export { auth, getFirestore, getFunctions, getStorage };
