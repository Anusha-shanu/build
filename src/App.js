import React, { useState, useEffect, useRef } from "react";
import API_BASE_URL from "./config";
import ChatSidebar from "./ChatSidebar";
import logo from "./mymentor_logo.jpg";

const languages = {
  en: { name: "English", code: "en-US" },
  ta: { name: "Tamil", code: "ta-IN" },
  hi: { name: "Hindi", code: "hi-IN" },
};

function generateId() {
  return Date.now().toString();
}

export default function App() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");

  // ✅ FIXED: removed quotes
  const [user, setUser] = useState({
    id: 1,
    name: localStorage.getItem("mm_username") || "Student",
    email: "student@example.com"
  });

  const [voices, setVoices] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Load voices for speech synthesis
  useEffect(() => {
    function loadVoices() {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Ask user's name first time
  useEffect(() => {
    const saved = localStorage.getItem("mm_username");
    if (!saved) {
      const name = window.prompt("Please enter your name:");
      if (name && name.trim()) {
        localStorage.setItem("mm_username", name.trim());
        setUser((prev) => ({ ...prev, name: name.trim() })); // update state too
      } else {
        localStorage.setItem("mm_username", "Student");
      }
    }
  }, []);

  // ... ✅ rest of your code stays the same ...
}
