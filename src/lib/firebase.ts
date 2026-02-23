import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCfoYuBD3homMYqq5DaEmr3u42CKn3qdM8",
    authDomain: "integrity-ai-lms.firebaseapp.com",
    projectId: "integrity-ai-lms",
    storageBucket: "integrity-ai-lms.firebasestorage.app",
    messagingSenderId: "306297957770",
    appId: "1:306297957770:web:12d0531371333da7c66c73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
