import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react"; 
import { Cat as Hat, Plus, Github, Linkedin, Youtube, Twitter, Instagram } from "lucide-react";

function Home() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { openSignUp } = useClerk();

  // Navigate to generated page
  const handleGenerate = () => {
    navigate("/generated-page");
  };

  // Open Clerk's sign-up page
  const handleSignUp = () => {
    openSignUp();
  };

  return (
    <>
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Hat className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold">
              <span className="text-white">STY</span>
              <span className="text-purple-400">LUX</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="px-6 py-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors" 
              onClick={handleSignUp} 
            >
              Sign up
            </button>
            <Link to="/try" className="px-6 py-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors">
              Try for free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-20 pb-32 text-center">
        <h1 className="text-5xl md:text-5xl font-bold text-white mb-6">
          The <span className="text-purple-400">fastest</span> way to get trendy collections with
        </h1>
        <h2 className="text-5xl md:text-5xl font-bold text-purple-400 mb-16">STYLUX AI</h2>

        {/* Message Input */}
        <div className="relative max-w-2xl mx-auto">
          <div className="flex items-center bg-zinc-100 rounded-full p-2">
            <button className="p-2 hover:bg-zinc-200 rounded-full transition-colors">
              <Plus className="w-6 h-6 text-zinc-600" />
            </button>
            <input
              type="text"
              placeholder="Message STYLUX"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-zinc-800"
            />
            <button 
              onClick={handleGenerate}
              className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
            >
              Generate
            </button>
          </div>
          <p className="text-zinc-400 text-sm mt-4">
            By clicking "Generate" you agree to our <a href="#" className="text-purple-400 hover:underline">Privacy Notice</a>
          </p>
        </div>

        {/* Additional Links */}
        <div className="mt-12">
          <Link to="/sign-up" className="px-4 py-2 bg-purple-500 rounded-lg">Sign Up</Link>
          <Link to="/login" className="ml-4 px-4 py-2 bg-blue-500 rounded-lg">Login</Link>
        </div>

        <Outlet />
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-purple-900 bg-opacity-50 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-xl font-bold">
                <span className="text-white">STY</span>
                <span className="text-purple-400">LUX</span>
              </span>
            </div>

            <div className="text-zinc-400">© StyluxAI 2025</div>

            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white hover:text-purple-400 transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="text-white hover:text-purple-400 transition-colors"><Youtube className="w-6 h-6" /></a>
              <a href="#" className="text-white hover:text-purple-400 transition-colors"><Linkedin className="w-6 h-6" /></a>
              <a href="#" className="text-white hover:text-purple-400 transition-colors"><Github className="w-6 h-6" /></a>
              <a href="#" className="text-white hover:text-purple-400 transition-colors"><Instagram className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
