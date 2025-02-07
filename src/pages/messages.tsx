import React, { useState, useEffect, useRef } from "react";
import { Menu, PenLine, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

function Message() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarHistory, setSidebarHistory] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessage: Message = {
      sender: "user",
      text: userInput,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatHistory(prev => [...prev, newMessage]);
    setSidebarHistory(prev => [userInput, ...prev].slice(0, 5));
    
    // Store the input before clearing
    const currentInput = userInput;
    setUserInput("");

    try {
      // Simulated AI response - Replace with your actual API call
      const botResponses: { [key: string]: string } = {
        "What should I wear to a wedding?": "For a wedding, I recommend:\n\n1. Formal Attire:\n- A tailored suit in navy or charcoal\n- A knee-length cocktail dress\n- Appropriate dress shoes\n\n2. Consider:\n- The wedding's dress code\n- Time of day\n- Venue setting\n- Season\n\nAvoid wearing white to not overshadow the bride!",
        "Suggest an outfit for a job interview": "For a job interview, here's a professional outfit:\n\n1. Conservative Option:\n- Well-fitted dark suit\n- Crisp dress shirt/blouse\n- Minimal accessories\n- Polished dress shoes\n\n2. Business Casual:\n- Blazer with dress pants/skirt\n- Quality dress shirt\n- Clean, professional shoes\n\nKeep it simple and professional!",
        "What's trending in fashion?": "Current fashion trends include:\n\n1. Sustainable Fashion:\n- Eco-friendly materials\n- Vintage and upcycled pieces\n\n2. Style Trends:\n- Oversized blazers\n- High-waisted pants\n- Monochrome outfits\n- Platform shoes\n\n3. Colors:\n- Earth tones\n- Vibrant neons\n- Pastels\n\nRemember, the best trend is what makes you feel confident!",
        "Hello":"Hello ✌️, how are you?\nwhat can i help with?",
        "Bye":"Bye,Have a good day 🙌"
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      let botReply = "Sorry, I couldn't process that request.";
      
      // Check for specific questions
      for (const [question, answer] of Object.entries(botResponses)) {
        if (currentInput.toLowerCase().includes(question.toLowerCase())) {
          botReply = answer;
          break;
        }
      }

      const botMessage: Message = {
        sender: "bot",
        text: botReply,
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatHistory(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        sender: "bot",
        text: "I apologize, but I'm having trouble processing your request right now. Please try again.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatHistory(prev => [...prev, errorMessage]);
    }
  };

  const handleSidebarClick = (message: string) => {
    setUserInput(message);
    setSidebarVisible(false);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-950 to-purple-900">
      {/* Sliding Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full w-64 bg-[#1C1C1C] transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          {/* Top Icons */}
          <div className="flex items-center gap-2 mb-8">
            <button onClick={toggleSidebar} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Menu className="w-6 h-6 text-zinc-400" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Search className="w-6 h-6 text-zinc-400" />
            </button>
          </div>

          {/* Recent Queries Section */}
          <div className="mt-4">
            <h3 className="text-gray-300 text-lg mb-2">Recent Queries</h3>
            <div className="space-y-2">
              {sidebarHistory.length === 0 ? (
                <p className="text-gray-500">No recent queries</p>
              ) : (
                sidebarHistory.map((query, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-2 text-gray-400 hover:text-purple-400 hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => handleSidebarClick(query)}
                  >
                    {query.length > 30 ? `${query.substring(0, 30)}...` : query}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Top Bar */}
          <div className="flex justify-between items-center p-4 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleSidebar}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
              <span className="text-purple-400 text-2xl font-semibold">STYLUX</span>
              <button className="p-1 hover:bg-purple-800/30 rounded">
                <PenLine size={20} className="text-purple-400" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                <Link to="/">Home</Link>
              </button>
              <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                <Link to="/try">Try for free</Link>
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white rounded-tr-sm"
                        : "bg-[#2D1F3D] text-white rounded-tl-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className="text-xs text-gray-300 mt-2 block">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-800">
            <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  placeholder="Message STYLUX..."
                  className="flex-1 bg-purple-900/40 backdrop-blur-lg px-4 py-3 rounded-lg border border-purple-800/50 text-white placeholder-zinc-400 outline-none"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <button
                  type="button"
                  className="p-2 hover:bg-purple-800/30 rounded-full border border-purple-700/50"
                >
                  <Plus size={20} className="text-purple-400" />
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;