// src/pages/LoginPage.jsx
import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div
        style={{
          width: 360,
          padding: 24,
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          textAlign: "center",
          background: "#fff",
        }}
      >
        <h2 style={{ marginBottom: 12 }}>Welcome to My Mentor</h2>
        <p style={{ color: "#666", marginBottom: 20 }}>
          Sign in to start chatting with your AI mentor.
        </p>
        <button
          onClick={googleLogin}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
