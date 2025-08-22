// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // if you plan to use Firestore later

const firebaseConfig = {
  apiKey: "AIzaSyAD3UzWf0HzZY9WOo8wsU5LPIG8914iEgI",
  authDomain: "aaru-app-3f0a2.firebaseapp.com",
  projectId: "aaru-app-3f0a2",
  storageBucket: "aaru-app-3f0a2.appspot.com", // ✅ fixed
  messagingSenderId: "470932293809",
  appId: "1:470932293809:web:2328b307b3c7dd56393a90",
  measurementId: "G-W3R7J3CXZ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth exports
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore export (optional, if you’ll save user data/questions)
export const db = getFirestore(app);

export default app;
