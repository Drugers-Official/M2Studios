// Firebase configuration and initialization
import { initializeApp, getApps } from "firebase/app"
import { getAuth, browserSessionPersistence, setPersistence, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
}

// Validate Firebase configuration
const isConfigValid = Object.values(firebaseConfig).every((value) => value && value !== "")

if (!isConfigValid) {
  console.error("[Firebase] Configuration Error: Missing environment variables.")
  console.error(
    "[Firebase] Please ensure all NEXT_PUBLIC_FIREBASE_* environment variables are set in your project settings.",
  )
  console.error("[Firebase] Current config:", {
    apiKey: firebaseConfig.apiKey ? "SET" : "MISSING",
    authDomain: firebaseConfig.authDomain ? "SET" : "MISSING",
    projectId: firebaseConfig.projectId ? "SET" : "MISSING",
    storageBucket: firebaseConfig.storageBucket ? "SET" : "MISSING",
    messagingSenderId: firebaseConfig.messagingSenderId ? "SET" : "MISSING",
    appId: firebaseConfig.appId ? "SET" : "MISSING",
  })
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const storage = getStorage(app)
const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()

if (typeof window !== "undefined") {
  setPersistence(auth, browserSessionPersistence).catch((error) => {
    console.error("[Firebase] Error setting session persistence:", error)
  })
}

export { auth, storage, db, isConfigValid, googleProvider }
export default app
