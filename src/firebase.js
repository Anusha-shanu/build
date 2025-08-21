// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // for login/signup

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD3UzWf0HzZY9WOo8wsU5LPIG8914iEgI",
  authDomain: "aaru-app-3f0a2.firebaseapp.com",
  projectId: "aaru-app-3f0a2",
  storageBucket: "aaru-app-3f0a2.firebasestorage.app",
  messagingSenderId: "470932293809",
  appId: "1:470932293809:web:2328b307b3c7dd56393a90",
  measurementId: "G-W3R7J3CXZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);   // export auth for login/signup

export { auth, analytics };
