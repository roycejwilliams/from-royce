"use client";
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth, Auth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Shared app instance
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Client-only services
let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  isAnalyticsSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  }).catch(() => null);
}

// Export core services
const auth: Auth = getAuth(app);
const storage: FirebaseStorage = getStorage(app);

export { app, auth, storage, analytics };
