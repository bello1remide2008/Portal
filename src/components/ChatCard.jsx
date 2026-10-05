import React, { useState } from "react";
import "./ChatCard.css";

const ChatCard = () => {
  const [message, setMessage] = useState("");

  const username = localStorage.getItem("userUsername") || "student";

  const sendMessage = () => {
    if (!message.trim()) return;

    const chats = JSON.parse(localStorage.getItem("chats")) || [];
    chats.push({
      id: Date.now(),
      from: username,
      to: "admin",
      text: message,
      time: new Date().toLocaleTimeString()
    });

    localStorage.setItem("chats", JSON.stringify(chats));
    setMessage("");
  };

  return (
    <div className="chat-card">
      <h3>💬 Message Your Teacher</h3>

      <textarea
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default ChatCard;
