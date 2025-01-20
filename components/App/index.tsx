import { useRef, useEffect, useState } from "react";
import { Send, Menu, Code, Blocks, Cpu } from "lucide-react";
import cn from "../../utils/cn";
import { useChat } from "../../hooks/useChat";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const features = [
    {
      icon: <Blocks className="w-6 h-6" />,
      title: "Blockchain Protocol",
      description: "Learn about AO's innovative blockchain architecture",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Smart Contracts",
      description: "Discover how to build and deploy smart contracts",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Development",
      description: "Get help with AO development and integration",
    },
  ];

  return (
    <div className="flex h-screen bg-[#1E1E1E] text-gray-100">
      <div className="flex-1 flex flex-col md:ml-[60px]">
        <div className="md:hidden flex items-center justify-between p-4 border-b border-[#2A2A2A]">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <img
            src="https://arweave.net/7E-LDadqO8ED02GPZhjpXNEgBaePDRJbIH-2miRo4SQ"
            alt="AO Logo"
            className="h-8 w-auto hidden"
          />
          <div className="w-8"></div>
        </div>

        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center px-4"
              >
                <div className="text-center max-w-2xl mx-auto">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <div className="relative w-32 h-32 mx-auto mb-8">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                        className="absolute inset-0 bg-white/5 rounded-full"
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: 0.2,
                        }}
                        className="absolute inset-4 bg-white/10 rounded-full"
                      />
                      <motion.img
                        src="https://arweave.net/7E-LDadqO8ED02GPZhjpXNEgBaePDRJbIH-2miRo4SQ"
                        alt="AO Logo"
                        className="absolute inset-0 w-full h-full p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-white/90 to-white/80 text-transparent bg-clip-text">
                      How can I help you with AO?
                    </h1>
                    <p className="text-gray-400 text-lg mb-12">
                      Ask me anything about the AO blockchain ecosystem
                    </p>
                  </motion.div>

                  <motion.div
                    className="grid md:grid-cols-3 gap-4 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * (index + 1) }}
                        className="p-6 rounded-xl bg-[#252525] hover:bg-[#2A2A2A] transition-all hover:scale-105 cursor-pointer group"
                        onClick={() => {
                          const input = document.querySelector("input");
                          if (input) {
                            input.focus();
                          }
                        }}
                      >
                        <div className="mb-4 text-white/90 group-hover:text-white transition-colors">
                          {feature.icon}
                        </div>
                        <h3 className="font-semibold mb-2 text-lg">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {feature.description}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-3xl mx-auto py-8 px-4 space-y-6"
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "transition-all duration-300 ease-in-out",
                      message.role === "user" ? "ml-auto" : "mr-auto"
                    )}
                  >
                    <div
                      className={cn(
                        "px-4 py-2 rounded-lg break-words whitespace-pre-wrap shadow-lg",
                        message.role === "user"
                          ? "bg-white/10 backdrop-blur-sm ml-auto"
                          : "bg-[#252525] backdrop-blur-sm"
                      )}
                      style={{
                        maxWidth: "calc(85% - 2rem)",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <div className="border-t border-[#2A2A2A] p-4 backdrop-blur-md bg-[#1E1E1E]/80">
          <div className="max-w-3xl mx-auto">
            <motion.form
              onSubmit={handleSubmit}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder={
                  messages.length === 0
                    ? "Ask about AO blockchain..."
                    : "Continue the conversation..."
                }
                className="w-full bg-[#2A2A2A] text-white placeholder-gray-400 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all shadow-lg"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all",
                  isLoading
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-white/80 hover:text-white hover:bg-[#3A3A3A]"
                )}
                disabled={isLoading}
              >
                <Send className="w-5 h-5" />
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}
