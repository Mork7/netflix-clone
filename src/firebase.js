import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCfYp7hr3PMvU360vWgaGClztC7B5Qwag0",
    authDomain: "netflix-clone-69c16.firebaseapp.com",
    projectId: "netflix-clone-69c16",
    storageBucket: "netflix-clone-69c16.appspot.com",
    messagingSenderId: "1019394725703",
    appId: "1:1019394725703:web:0a03eb43e4ea1d82ac1e62"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();

export { auth, db };
