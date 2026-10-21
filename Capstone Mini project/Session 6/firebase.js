// ============================================================================
// Firebase Authentication Configuration — Session 6
// ============================================================================
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';

// 🔑 Firebase Project Configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSySession6FirebaseAuthSampleKey123",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "capstone-session6-auth.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "capstone-session6-auth",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "capstone-session6-auth.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789012:web:authabcdef123"
};

// Singleton Firebase initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase Auth Instance
const auth = getAuth(app);

// Q4 Requirement: Set explicit local persistence so browser refresh doesn't log user out
try {
  setPersistence(auth, browserLocalPersistence);
} catch (error) {
  console.warn("Could not set local persistence:", error);
}

export {
  app,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  firebaseConfig
};
