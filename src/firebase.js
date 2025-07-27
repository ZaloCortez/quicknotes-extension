import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAr4t_39AqZw_M35AFPEE-FXB0cHqxMTLk",
    authDomain: "quicknotesextension.firebaseapp.com",
    projectId: "quicknotesextension",
    storageBucket: "quicknotesextension.firebasestorage.app",
    messagingSenderId: "153502618542",
    appId: "1:153502618542:web:09009f539b446e12abee3f"
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);