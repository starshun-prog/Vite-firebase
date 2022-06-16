// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
import { connectAuthEmulator, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_APIKEY,
  authDomain:import.meta.env.VITE_AUTHDOMAIN,
  projectId:import.meta.env.VITE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId:import.meta.env.VITE_MESSAGINGSENDER_ID,
  appId:import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099");
export const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8080);