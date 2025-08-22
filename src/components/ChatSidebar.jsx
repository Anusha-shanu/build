// src/components/ChatSidebar.jsx
import React from "react";

export default function ChatSidebar({
  chats = [], // ✅ default empty array
  selectedChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  user,
}) {
  return (
    <aside
      style={{
        width: 260,
        borderRight: "1px solid #eee",
        display: "flex",
        flexDirection: "column",
        background: "#fafafa",
      }}
    >
      {/* Top Section */}
      <div
        style={{
          padding: 16,
          borderBottom: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <button
          onClick={onNewChat}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "none",
            background: "#ff6a3d",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          + New Chat
        </button>
        <div style={{ fontSize: 14, color: "#555" }}>
          👋 Hi, {user?.displayName || "User"}
        </div>
      </div>

      {/* Chat List */}
      <div style={{ flex: 1, overflowY: "auto", padding: 8 }}>
        {Array.isArray(chats) && chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 10px",
                marginBottom: 6,
                borderRadius: 8,
                cursor: "pointer",
                background:
                  chat.id === selectedChatId ? "#eaf3ff" : "transparent",
              }}
            >
              {/* Chat title (click to open) */}
              <span
                onClick={() => onSelectChat(chat.id)}
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: "#333",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {chat.title}
              </span>

              {/* Delete button */}
              <button
                onClick={() => onDeleteChat(chat.id)}
                style={{
                  marginLeft: 8,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#888",
                }}
                title="Delete chat"
              >
                🗑️
              </button>
            </div>
          ))
        ) : (
          <div style={{ color: "#777", fontSize: 14, textAlign: "center", marginTop: 20 }}>
            No chats yet. Start a new one!
          </div>
        )}
      </div>
    </aside>
  );
}
