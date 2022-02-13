import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

// const firebaseConfigTesting = {
//   apiKey: "AIzaSyAs6YugFhhN0xVVrRVvJMw7_Wb-jgAZjBE",
//   authDomain: "sql-demos-37a0e.firebaseapp.com",
//   projectId: "sql-demos-37a0e",
//   storageBucket: "sql-demos-37a0e.appspot.com",
//   messagingSenderId: "264729102710",
//   appId: "1:264729102710:web:7f0adcaf2782984dfcd257",
//   measurementId: "G-PD1E74ZE3L"
// };

// if( process.env.NODE_ENV === 'test' ) {
//   // testing
//   initializeApp(firebaseConfigTesting);
// } else {
//   // dev/prod
// }

initializeApp(firebaseConfig);
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();
 
export {
    db,
    googleAuthProvider,
    signInWithPopup,
    getAuth,
    doc, //Referencia a documento en Firestore
    setDoc, // Setea Datos en la base de Firestore,
    collection,
}