import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAD3UzWf0HzZY9WOo8wsU5LPIG8914iEgI",
  authDomain: "aaru-app-3f0a2.firebaseapp.com",
  projectId: "aaru-app-3f0a2",
  storageBucket: "aaru-app-3f0a2.firebasestorage.app",
  messagingSenderId: "470932293809",
  appId: "1:470932293809:web:2328b307b3c7dd56393a90",
  measurementId: "G-W3R7J3CXZ8"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]); // chat history
  const [input, setInput] = useState("");

  // ✅ Login
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setMessages([]);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fake AI backend call (replace with your real API later)
  const fetchAIResponse = async (question) => {
    return "This is AI’s reply to: " + question;
  };

  // ✅ Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    // Clear input
    setInput("");

    // Get AI response
    const aiReply = await fetchAIResponse(input);
    const newAIMessage = { sender: "ai", text: aiReply };

    setMessages((prev) => [...prev, newAIMessage]);
  };

  // ✅ Speak function
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN"; // Indian English accent
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="app" style={{ fontFamily: "Arial", padding: "20px" }}>
      {!user ? (
        <button onClick={handleLogin}>Login with Google</button>
      ) : (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <button onClick={handleLogout}>Logout</button>

          {/* Chat box */}
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginTop: "20px",
              height: "400px",
              overflowY: "auto",
              borderRadius: "8px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "10px 0",
                }}
              >
                <span
                  style={{
                    background: msg.sender === "user" ? "#dcf8c6" : "#f1f0f0",
                    padding: "10px",
                    borderRadius: "10px",
                    display: "inline-block",
                    maxWidth: "70%",
                  }}
                >
                  {msg.text}
                </span>
                {msg.sender === "ai" && (
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => speak(msg.text)}
                  >
                    🔊 Speak
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ marginTop: "20px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              style={{ width: "70%", padding: "10px" }}
            />
            <button onClick={handleSend} style={{ marginLeft: "10px" }}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
