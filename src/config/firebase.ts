import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getAuth } from "firebase/auth";

// Environment-based config (no secrets in repo)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase once
if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig);
}

// Firebase instances
const firestore = Firebase.firestore();
const storage = Firebase.storage();
const FieldValue = Firebase.firestore.FieldValue;
const auth = getAuth();

export {
  firestore,
  storage,
  firebaseConfig,
  auth,
  FieldValue,
  Firebase as default,
};
