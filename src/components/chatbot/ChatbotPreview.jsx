import React, { useState, useEffect, useRef } from "react";

// Sample common user questions for suggestions
const COMMON_USER_QUESTIONS = [
  "How much does the premium plan cost?",
  "Can I upgrade my subscription later?",
  "How do I reset my password?",
  "What features are included in the basic plan?",
  "Is there a free trial available?",
  "How do I contact customer support?",
  "Can I use this on multiple devices?",
  "How secure is my data?",
  "Do you offer refunds?",
  "How do I cancel my subscription?",
];

export default function ChatbotPreview({ config }) {
  const [isOpen, setIsOpen] = useState(true); // Start open in preview mode
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize chat with welcome message when config changes
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: config.welcomeMessage,
        sender: "bot",
        timestamp: new Date().toISOString(),
      },
    ]);

    // Set initial suggested questions
    const randomQuestions = [...COMMON_USER_QUESTIONS]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setSuggestedQuestions(randomQuestions);
  }, [config.welcomeMessage]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const callGroqAPI = async (userMessage) => {
    setIsLoading(true);

    try {
      // Prepare system message based on knowledge base and tone
      const knowledgeBase = config.knowledgeBase || "Product Information";
      const tone = config.responseTone || "Professional";

      // Create a system message that defines the AI's role and how it should respond
      const systemMessage = `You are a helpful customer service AI assistant for a company. 
      You specialize in ${knowledgeBase}. 
      Please respond in a ${tone} tone. 
      Keep your responses concise and helpful.`;

      // Prepare the conversation history for the API
      const messageHistory = messages
        .filter((msg) => msg.sender === "user" || msg.sender === "bot")
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        }));

      // Add the new user message
      messageHistory.push({
        role: "user",
        content: userMessage,
      });

      // Make the API request
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
              { role: "system", content: systemMessage },
              ...messageHistory,
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response from Groq API");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling Groq API:", error);
      return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");

    // Generate new suggested questions
    const newQuestions = [...COMMON_USER_QUESTIONS]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setSuggestedQuestions(newQuestions);

    // Add a loading message
    const loadingId = Date.now() + 1;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: loadingId,
        text: "Thinking...",
        sender: "bot",
        timestamp: new Date().toISOString(),
        isLoading: true,
      },
    ]);

    // Get AI response from Groq
    const aiResponse = await callGroqAPI(text);

    // Remove loading message and add the actual response
    setMessages((prevMessages) =>
      prevMessages
        .filter((msg) => msg.id !== loadingId)
        .concat({
          id: Date.now() + 2,
          text: aiResponse,
          sender: "bot",
          timestamp: new Date().toISOString(),
        })
    );

    // Handle human handoff if the complexity is high (simulate with random chance)
    if (config.handoffThreshold <= 2 && Math.random() > 0.7) {
      setTimeout(() => {
        const handoffMessage = {
          id: Date.now() + 3,
          text: "I'm transferring you to a human agent for further assistance. Please wait a moment.",
          sender: "bot",
          timestamp: new Date().toISOString(),
          isHandoff: true,
        };

        setMessages((prevMessages) => [...prevMessages, handoffMessage]);
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="relative border border-[#F78CA2] rounded-lg shadow-md mb-6">
      <div className="bg-[#F9DEC9] p-3 text-[#3D0C11] font-medium text-center">
        Chatbot Preview - See how your configuration will appear to users
      </div>

      <div className="p-4">
        <div className="w-full h-96 bg-white rounded-lg border border-[#F78CA2] flex flex-col overflow-hidden">
          <div className="bg-[#D80032] text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">{config.name}</h3>
            <button
              onClick={handleToggleChat}
              className="text-white hover:text-[#F9DEC9]"
            >
              {isOpen ? "✕" : "↓"}
            </button>
          </div>

          {isOpen && (
            <>
              <div className="flex-grow p-3 overflow-y-auto bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-3 py-2 max-w-[80%] ${
                        message.sender === "user"
                          ? "bg-[#D80032] text-white"
                          : message.isHandoff
                          ? "bg-[#3D0C11] text-white"
                          : "bg-[#F9DEC9] text-[#3D0C11]"
                      }`}
                    >
                      <div className="text-sm">
                        {message.isLoading ? (
                          <span className="inline-flex items-center">
                            Thinking
                            <span className="animate-pulse">...</span>
                          </span>
                        ) : (
                          message.text
                        )}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-[#F9DEC9]"
                            : message.isHandoff
                            ? "text-[#F9DEC9]"
                            : "text-[#3D0C11]/60"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />

                {messages.length === 1 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">
                      Suggested questions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleSendMessage(question)}
                          className="text-sm bg-[#F9DEC9] text-[#3D0C11] px-3 py-1 rounded-full hover:bg-[#F78CA2] transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-3 border-t border-[#F9DEC9] flex"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow p-2 border border-[#F78CA2] rounded-l focus:outline-none focus:ring-2 focus:ring-[#D80032] focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`bg-[#D80032] text-white p-2 rounded-r transition-colors ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#B80025]"
                  }`}
                  disabled={isLoading}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <div className="p-3 bg-[#F9DEC9]/50 text-sm text-[#3D0C11] rounded-b-lg">
        <p>
          <strong>Preview Settings:</strong> {config.knowledgeBase} knowledge
          base, {config.responseTone} tone, Handoff threshold:{" "}
          {config.handoffThreshold}/5
        </p>
      </div>
    </div>
  );
}
