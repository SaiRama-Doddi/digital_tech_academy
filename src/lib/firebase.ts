import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDlTnbqsBrLepfI_JWPkjLFeuNEo0oW-ik",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "digital-and-cyber.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "digital-and-cyber",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "digital-and-cyber.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "298584402851",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:298584402851:web:54301f5391d10f39e60816",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-EHD33LVK05",
};

// Initialize Firebase App (prevent duplicate initialization during HMR / SSR)
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firebase Auth & Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);

// Safe Analytics Initialization (Client-side browser only)
export let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export default app;
