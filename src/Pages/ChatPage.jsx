// src/pages/ChatPage.jsx
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import ChatSidebar from "../components/ChatSidebar";

export default function ChatPage({ user }) {
  const [messages, setMessages] = useState([]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <ChatSidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 bg-gray-200 shadow">
          <h1 className="text-lg font-semibold">Welcome, {user.displayName}</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-gray-500">Start chatting with My Mentor!</p>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="mb-2">
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
