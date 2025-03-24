// Import the Firebase functions you need
import { initializeApp, FirebaseApp, getApps, getApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { Auth, getAuth } from "firebase/auth";
const functions = require("firebase-functions");


// Firebase configuration
const firebaseConfig = {
  apiKey: functions.config().myfirebase.api_key,
  authDomain: functions.config().myfirebase.auth_domain,
  projectId: functions.config().myfirebase.project_id,
  storageBucket: functions.config().myfirebase.storage_bucket,
  messagingSenderId: functions.config().myfirebase.messaging_sender_id,
  appId: functions.config().myfirebase.app_id,
  measurementId: functions.config().myfirebase.measurement_id,
};

console.log("Firebase API Key: ", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);




// Initialize Firebase
let app: FirebaseApp;
let auth: Auth | undefined;
let storage: FirebaseStorage | undefined;
let analytics: Analytics | undefined;

if (typeof window !== 'undefined') {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  auth = getAuth(app);
  storage = getStorage(app);
  analytics = getAnalytics(app);
}




// Export Firebase services
export { storage, analytics, auth };
