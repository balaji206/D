import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './chatbot.css'
// Define types for messages
interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

interface ApiResponse {
  reply: string;
}

const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [sidebarHistory, setSidebarHistory] = useState<string[]>([]); // Sidebar message history
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage: Message = {
      sender: "user",
      text: userInput,
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);
    setSidebarHistory((prevHistory) => [...prevHistory, userInput]); // Add message to sidebar history
    setUserInput("");

    try {
      const response = await axios.post<ApiResponse>("http://localhost:5000/api/recommend", { message: userInput });
      const botMessage: Message = {
        sender: "bot",
        text: response.data.reply,
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage: Message = {
        sender: "bot",
        text: "Sorry, I couldn't process that request.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
    }
  };

  // Function to re-use a previous question from the sidebar
  const handleSidebarClick = (message: string) => {
    setUserInput(message);
  };

  return (
    <div >
      {/* Sidebar */}
      <div className="nav">
      <div className="w-64 bg-gray-800 p-4 flex flex-col">
        <div className="text-white text-2xl font-semibold mb-4">STYLUX</div>
        <div className="text-white text-lg mb-8">💬 Explore STYLUX</div>

        <div className="text-gray-400 text-sm mb-2">🕑 Recent Queries</div>
        <div className="scroll">
        <div className="overflow-y-auto margin-left-10">
          {sidebarHistory.map((msg, index) => (
            <div
              key={index}
              className="sidebar-item text-gray-300 py-2 px-4 cursor-pointer hover:bg-gray-700 rounded-md"
              onClick={() => handleSidebarClick(msg)}
            >
              {msg.length > 30 ? `${msg.substring(0, 30)}...` : msg} {/* Shorten long messages */}
            </div>
          ))}
        </div>
        </div>
      </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-purple-900 p-6 flex flex-col ">
        <div className="flex justify-between items-center mb-6">
          
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto bg-purple-800 rounded-lg p-4">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block p-3 rounded-lg max-w-[80%] ${msg.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"}`}
              >
                {msg.text}
              </div>
              <div className={`text-xs text-white ${msg.sender === "user" ? "text-right" : "text-left"}`}>{msg.timestamp}</div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Section */}
        <div className="flex items-center space-x-4 mt-4">
          <button className="bg-purple-500 text-white p-3 rounded-full">
            ➕ Browse
          </button>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Message STYLUX"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 p-3 rounded-lg bg-purple-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
