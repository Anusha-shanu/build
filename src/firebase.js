// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAD3UzWf0HzZY9WOo8wsU5LPIG8914iEgI",
  authDomain: "aaru-app-3f0a2.firebaseapp.com",
  projectId: "aaru-app-3f0a2",
  storageBucket: "aaru-app-3f0a2.firebasestorage.app",
  messagingSenderId: "470932293809",
  appId: "1:470932293809:web:2328b307b3c7dd56393a90",
  measurementId: "G-W3R7J3CXZ8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
