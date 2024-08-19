// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {getAuth, connectAuthEmulator } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoyj2FuseC0zCSNEp3Sw85xQyDsYDZ_zE",
  authDomain: "ixiclinic.firebaseapp.com",
  projectId: "ixiclinic",
  storageBucket: "ixiclinic.appspot.com",
  messagingSenderId: "758576331205",
  appId: "1:758576331205:web:2f3421f80ee08b58c8f3ac",
  measurementId: "G-LYCBQS79MB"
};

// Initialize Firebase

initializeApp(firebaseConfig);
const database = getFirestore();
export const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);


// Connect to Firestore emulator
if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(database, 'localhost', 8080);
  connectAuthEmulator(FIREBASE_AUTH, 'http://localhost:9099');
}

export { database, FIREBASE_AUTH };