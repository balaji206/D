import React, { useState } from "react";
import { Menu, PenLine, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Chatbot from "./chatbot";

function Message() {
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // Track the state of the hamburger menu
  const [recentQueries, setRecentQueries] = useState<string[]>([]); // Store recent queries

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add message to recent queries
    setRecentQueries((prevQueries) => [message, ...prevQueries].slice(0, 5)); // Keep only the last 5 queries

    // Reset the input after sending
    setMessage("");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen); // Toggle menu state

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-purple-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-[#1C1C1C] p-4">
        <div className="flex items-center justify-center">
          <Menu size={24} className="text-gray-300 cursor-pointer" onClick={toggleMenu} />
        </div>

        {/* Hamburger Menu */}
        {menuOpen && (
          <div className="absolute top-0 left-16 bg-[#2C2C2C] p-4 rounded-lg shadow-md mt-16 w-48">
            <h3 className="text-gray-300 text-lg mb-2">Recent Queries</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {recentQueries.length === 0 ? (
                <li>No recent queries</li>
              ) : (
                recentQueries.map((query, index) => (
                  <li key={index}>{query}</li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="ml-16 p-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-purple-400 text-2xl font-semibold">STYLUX</span>
            <button className="p-1 hover:bg-purple-800/30 rounded">
              <PenLine size={20} className="text-purple-400" />
            </button>
          </div>
          <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
            <Link to="/try">Try for free</Link>
          </button>
        </div>

        {/* Chat Interface */}
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="bg-purple-900/40 backdrop-blur-lg p-8 rounded-2xl border border-purple-800/50">
              <input
                type="text"
                placeholder="Message STYLUX"
                className="w-full bg-transparent text-white placeholder-zinc-400 outline-none text-2xl mb-8"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="flex gap-4">
                <button
                  type="button"
                  className="p-3 hover:bg-purple-800/30 rounded-full border border-purple-700/50"
                >
                  <Plus size={24} className="text-purple-400" />
                </button>

                <button
                  type="submit"
                  className="ml-auto px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full transition-colors"
                >
                  Generate
                </button>
              </div>
            </div>
          </form>

          {/* Chatbot Component */}
          <Chatbot />

          <p className="text-gray-400 text-sm text-center mt-4">
            By clicking "Generate" you agree to generate.{" "}
            <a href="#" className="text-purple-400 hover:underline">
              Privacy Notice
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Message;
