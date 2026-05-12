import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  recaptchaSiteKey: "6Ldo--UsAAAAAIaW_pg60v0iEmnzmeRCM2jLSfHH",
};

// Initialize Firebase only if we have an API key.
// In Next.js, this module is evaluated on both server and client.
let app: FirebaseApp;
let auth: Auth;

if (firebaseConfig.apiKey) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  // If API key is missing (e.g. during build or misconfigured env),
  // we provide a dummy object to prevent top-level crashes.
  // IMPORTANT: The user must add NEXT_PUBLIC_FIREBASE_API_KEY to Vercel.
  if (typeof window !== "undefined") {
    console.warn("Firebase API Key is missing. Check your environment variables.");
  }
  app = {} as FirebaseApp;
  auth = {} as Auth;
}

export { app, auth };
