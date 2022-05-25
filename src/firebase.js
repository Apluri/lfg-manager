// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Production config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

// Development config
const firebaseConfigDevelopment = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY_DEV,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_DEV,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_DEV,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_DEV,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_DEV,
  appId: process.env.REACT_APP_FIREBASE_APP_ID_DEV,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_DEV,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
