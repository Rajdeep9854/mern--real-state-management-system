// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-realstate-management.firebaseapp.com",
    projectId: "mern-realstate-management",
    storageBucket: "mern-realstate-management.appspot.com",
    messagingSenderId: "199641113172",
    appId: "1:199641113172:web:9f1894c78209e80cbc43c1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);