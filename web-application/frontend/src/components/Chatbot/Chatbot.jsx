import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";
import "./Chatbot.css"; // Import the CSS file

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  // Function to toggle chatbot popup
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Function to send user messages and get bot responses
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setInput(""); // Clear input field

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
        }),
      });

      const data = await response.json();
      const botMessage = {
        text: data.choices[0]?.message?.content || "Sorry, I couldn't understand that.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      {/* Chatbot Floating Icon */}
      <div className="chatbot-icon" onClick={toggleChat}>
        <FaRobot />
      </div>

      {/* Chatbot Popup */}
      <div className={`chatbot-popup ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="chatbot-header">
          AI Chatbot
          <FaTimes className="chatbot-close" onClick={toggleChat} />
        </div>

        {/* Messages */}
        <div className="chatbot-messages" ref={chatRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}-message`}>
              {msg.sender === "user" ? (
                <>
                  <span className="message-text">{msg.text}</span>
                  <FaUser className="message-icon" />
                </>
              ) : (
                <>
                  <FaRobot className="message-icon" />
                  <span className="message-text">{msg.text}</span>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Pressing "Enter" sends the message
          />

          <button onClick={sendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
