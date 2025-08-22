// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Loginpage from "./pages/Loginpage";
import Chatpage from "./pages/Chatpage";

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = logged out

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => unsub();
  }, []);

  if (user === undefined) {
    return <div style={{ padding: 24 }}>Loading…</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Chatpage user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Loginpage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
