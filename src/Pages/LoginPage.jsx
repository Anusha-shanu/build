// src/pages/LoginPage.jsx 
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

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
            src="/logo.png" // ✅ Place generated logo here
            alt="My Mentor"
            className="w-24 h-24 rounded-full shadow-lg border-2 border-purple-300"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          My Mentor
        </h1>
        <p className="text-gray-500 mb-8 italic">
          Joyful Journeys from Books to Brilliance ✨
        </p>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-6 h-6"
          />
          <span className="text-gray-700 font-medium">
            Sign in with Google
          </span>
        </button>
      </div>
    </div>
  );
}
