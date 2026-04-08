// ============================================================
// Firebase Configuration — Realtime Database
// ============================================================
// Reads config from environment variables set in .env.local
// See .env.local.example for required keys.

import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDjBDUSChlSUIM1HUuri1QttWsU0MdMUDU",
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "library-219e3.firebaseapp.com",
  // We need a valid URL format for getDatabase() to not throw during Next.js build:
  databaseURL:       process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://library-219e3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "library-219e3",
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "library-219e3.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "884764269048",
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:884764269048:web:77f3658087634767129e0d",
};

// Avoid re-initializing on hot reload
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getDatabase(app);
export default app;
