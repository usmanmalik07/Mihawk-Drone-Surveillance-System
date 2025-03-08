import React, { useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";
import "./Chatbot.css"; // Import the CSS file

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Function to toggle chatbot popup
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Floating Help Message (Only visible when chatbot is closed) */}
      {!isOpen && <div className="chatbot-help">Do you need help?</div>}

      {/* Chatbot Floating Icon */}
      <div className="chatbot-icon" onClick={toggleChat}>
        <FaRobot />
      </div>

      {/* Chatbot Popup */}
      <div className={`chatbot-popup ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="chatbot-header">
          Mihawk
          <FaTimes className="chatbot-close" onClick={toggleChat} />
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
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
          />
          <button>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
