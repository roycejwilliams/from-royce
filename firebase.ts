// Import the Firebase functions you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "from-royce.firebaseapp.com",
  projectId: "from-royce",
  storageBucket: "from-royce.firebasestorage.app",
  messagingSenderId: "1042271682270",
  appId: "1:1042271682270:web:1a7ecfa216621cce3b4c4f",
  measurementId: "G-L3241H26V3"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);
const auth = getAuth(app);


// Ensure Analytics is only initialized in the browser
let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Export Firebase services
export { storage, analytics, auth };
