import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: (import.meta.env['VITE_FIREBASE_API_KEY'] as string | undefined) || "AIzaSyBtxW60E2HuQ7W9ceklKCNabUt-JRP4RVk",
  authDomain: (import.meta.env['VITE_FIREBASE_AUTH_DOMAIN'] as string | undefined) || "digital-tech-dd790.firebaseapp.com",
  projectId: (import.meta.env['VITE_FIREBASE_PROJECT_ID'] as string | undefined) || "digital-tech-dd790",
  storageBucket: (import.meta.env['VITE_FIREBASE_STORAGE_BUCKET'] as string | undefined) || "digital-tech-dd790.firebasestorage.app",
  messagingSenderId: (import.meta.env['VITE_FIREBASE_MESSAGING_SENDER_ID'] as string | undefined) || "1034712213292",
  appId: (import.meta.env['VITE_FIREBASE_APP_ID'] as string | undefined) || "1:1034712213292:web:b5c17f24a83f4ddde8ee89",
  measurementId: (import.meta.env['VITE_FIREBASE_MEASUREMENT_ID'] as string | undefined) || "G-4FKFHYL073",
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
