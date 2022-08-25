// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdKb6nVM9uLaPqQOA_54edXHJMsulpFfI",
  authDomain: "beactive-23309.firebaseapp.com",
  projectId: "beactive-23309",
  storageBucket: "beactive-23309.appspot.com",
  messagingSenderId: "1026877296323",
  appId: "1:1026877296323:web:0879bfe81689387e921c76"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app);