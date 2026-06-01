import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, initializeRecaptchaConfig } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only if we have an API key.
// In Next.js, this module is evaluated on both server and client.
let app: FirebaseApp;
let auth: Auth;

if (firebaseConfig.apiKey) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);

  // Pre-fetch reCAPTCHA Enterprise config so the SDK knows the correct
  // siteKey and enforcement state before any phone-auth call is made.
  // This project has PHONE_PROVIDER set to "ENFORCE" — without this call
  // the SDK's handleRecaptchaFlow sees a null config and tries a v2-only
  // flow, which the backend rejects with auth/internal-error.
  if (typeof window !== "undefined") {
    initializeRecaptchaConfig(auth).catch(() => {
      // Non-fatal: phone auth will still attempt to fetch config on demand.
    });
  }
} else {
  if (typeof window !== "undefined") {
    console.warn("Firebase API Key is missing. Check your environment variables.");
  }
  app = {} as FirebaseApp;
  auth = {} as Auth;
}

export { app, auth };
