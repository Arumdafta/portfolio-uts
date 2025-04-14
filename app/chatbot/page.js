'use client';
import { useState } from 'react';
import '../styles/chatbot.css';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input) return;

    const newMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newMsg]);
    setLoading(true);

    const res = await fetch('/api/gemini-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMsg = { sender: 'bot', text: data.reply };
    setMessages((prev) => [...prev, botMsg]);
    setInput('');
    setLoading(false);
  }

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">Chatbot Gemini AI</h1>
      <div className="chatbox">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <span>{msg.text}</span>
          </div>
        ))}
        {loading && <div className="message bot">Sedang mengetik...</div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          placeholder="Tulis pesan..."
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
        />
        <button onClick={handleSend} className="send-button">Kirim</button>
      </div>
    </div>
  );
}
