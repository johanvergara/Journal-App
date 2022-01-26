import 'firebase/firestore';
import 'firebase/auth';
 
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDgAQKBbuJkETJ-bmA-9FJLmuqkCXg2aao",
    authDomain: "react-app-cursos-59125.firebaseapp.com",
    projectId: "react-app-cursos-59125",
    storageBucket: "react-app-cursos-59125.appspot.com",
    messagingSenderId: "787333065223",
    appId: "1:787333065223:web:62d00acd808817d52d58a2"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();
 
export {
    db,
    googleAuthProvider,
    signInWithPopup,
    getAuth
}