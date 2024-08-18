// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOpTpF0q1qSWSCMoMnI8xnSHO_-XrJbSI",
  authDomain: "internarea-4c2b9.firebaseapp.com",
  projectId: "internarea-4c2b9",
  storageBucket: "internarea-4c2b9.appspot.com",
  messagingSenderId: "57570844551",
  appId: "1:57570844551:web:24aa801ad58cf272b17d22",
  measurementId: "G-2K0FL795QY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider}