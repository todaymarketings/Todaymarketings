// src/components/chatbot/ChatbotTest.jsx
import React, { useState } from "react";

export default function ChatbotTest({
  botName = "Customer Support Assistant",
}) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      content: `Hello! I'm your 24/7 ${botName}. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessages = [
      ...messages,
      {
        sender: "user",
        content: inputMessage,
        timestamp: new Date(),
      },
    ];

    setMessages(newMessages);
    setInputMessage("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I understand your concern. Let me help you with that.",
        "Thanks for reaching out! I'd be happy to assist you with this issue.",
        "I've found some information that might help with your question.",
        "Let me check our knowledge base for the best solution to your problem.",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          content: randomResponse,
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-96 w-full max-w-md border border-[#F78CA2] rounded-lg shadow-md">
      <div className="bg-[#D80032] text-white p-3 rounded-t-lg">
        <h3 className="font-medium">{botName}</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-[#F9DEC9] text-[#3D0C11]"
                  : "bg-[#F0F0F0] text-[#3D0C11]"
              }`}
            >
              {msg.content}
              <div className="text-xs text-gray-500 mt-1">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-3 bg-white rounded-b-lg">
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-[#F78CA2] rounded focus:outline-none focus:ring-2 focus:ring-[#D80032] focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-[#D80032] text-white p-2 rounded hover:bg-[#3D0C11] transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
