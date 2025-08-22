// src/pages/ChatPage.jsx
import React, { useMemo, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import ChatSidebar from "../components/ChatSidebar";
import { GEMINI_API_KEY } from "../config"; // ✅ only Gemini key needed here

const makeId = () => Math.random().toString(36).slice(2, 10);

export default function ChatPage({ user }) {
  const [chats, setChats] = useState([
    { id: makeId(), title: "Welcome", messages: [] },
  ]);
  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const currentChat = useMemo(
    () => chats.find((c) => c.id === selectedChatId),
    [chats, selectedChatId]
  );

  const addMessage = (sender, text) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === selectedChatId
          ? { ...c, messages: [...c.messages, { sender, text }] }
          : c
      )
    );
  };

  const onSend = async () => {
    const text = input.trim();
    if (!text) return;
    addMessage("You", text);
    setInput("");

    try {
      setLoading(true);
      // ✅ Call Gemini API safely
      const resp = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
          GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text }] }],
          }),
        }
      );

      const data = await resp.json();
      const aiReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ Sorry, no reply.";
      addMessage("AI", aiReply);
    } catch (err) {
      console.error("Gemini error", err);
      addMessage("AI", "⚠️ Error fetching reply.");
    } finally {
      setLoading(false);
    }
  };

  // Manual speak
  const speak = (text) => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      window.speechSynthesis.speak(u);
    } catch (e) {
      console.warn("TTS not available", e);
    }
  };

  const onNewChat = () => {
    const id = makeId();
    setChats((prev) => [{ id, title: "New Chat", messages: [] }, ...prev]);
    setSelectedChatId(id);
  };

  const onSelectChat = (id) => setSelectedChatId(id);

  const onDeleteChat = (id) => {
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (id === selectedChatId && chats.length > 1) {
      setSelectedChatId(chats[0].id);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#fff" }}>
      <ChatSidebar
        chats={chats}
        selectedChatId={selectedChatId}
        onNewChat={onNewChat}
        onSelectChat={onSelectChat}
        onDeleteChat={onDeleteChat} // ✅ added delete support
        user={user}
      />

      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            borderBottom: "1px solid #eee",
            background: "#fff",
          }}
        >
          <strong>My Mentor</strong>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#666", fontSize: 14 }}>
              {user.displayName}
            </span>
            <button
              onClick={logout}
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 16,
            background: "#f7f7f7",
          }}
        >
          {currentChat?.messages.map((m, i) => (
            <div
              key={i}
              style={{
                maxWidth: 720,
                margin: "8px 0",
                padding: "10px 12px",
                borderRadius: 12,
                background: m.sender === "You" ? "#fff" : "#eaf3ff",
                border: "1px solid #eee",
              }}
            >
              <strong>{m.sender}: </strong>
              {m.text}
              {m.sender === "AI" && (
                <button
                  onClick={() => speak(m.text)}
                  title="Speak"
                  style={{
                    marginLeft: 10,
                    padding: "4px 8px",
                    fontSize: 12,
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  🔊
                </button>
              )}
            </div>
          ))}
          {loading && (
            <div
              style={{
                margin: "8px 0",
                padding: "10px 12px",
                borderRadius: 12,
                background: "#eaf3ff",
                border: "1px solid #eee",
              }}
            >
              <em>AI is typing…</em>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div
          style={{
            display: "flex",
            gap: 8,
            padding: 12,
            borderTop: "1px solid #eee",
            background: "#fff",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder="Type your question…"
            style={{
              flex: 1,
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid #ddd",
              outline: "none",
            }}
          />
          <button
            onClick={onSend}
            disabled={loading}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "none",
              background: loading ? "#ccc" : "#ff6a3d",
              color: "#fff",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </main>
    </div>
  );
}
