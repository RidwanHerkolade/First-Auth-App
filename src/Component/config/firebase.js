// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArCq3cyAI4OAqj2Ayk5dX9rXMqvhjSpiI",
  authDomain: "first-auth-app-e29e3.firebaseapp.com",
  projectId: "first-auth-app-e29e3",
  storageBucket: "first-auth-app-e29e3.firebasestorage.app",
  messagingSenderId: "575327720748",
  appId: "1:575327720748:web:e9b6deecd985cf39880889",
  measurementId: "G-CZ8MVL1FRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)

; 