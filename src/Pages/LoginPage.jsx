// src/pages/LoginPage.jsx 
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import myLogo from "../mymentor_logo.jpg"; // adjust path if inside /assets

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login error:", error);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="p-10 bg-white rounded-2xl shadow-2xl w-full max-w-md text-center">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={myLogo}
            alt="My Mentor Logo"
            className="w-28 h-28 rounded-full shadow-lg border-2 border-purple-300"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          My Mentor
        </h1>
        <p className="text-gray-500 mb-8 italic">
          Joyful Journeys from Books to Brilliance ✨
        </p>

        {/* Clean Google Login Button (no Google logo) */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm text-gray-700 font-medium"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
