"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Bot,
  User,
  Loader2,
  X,
  MessageCircle,
  ExternalLink,
  Mail,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CHAT_STORAGE_KEY = "kyle-portfolio-chat-history";
const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "hi! i'm kyle's ai assistant. ask me anything about his experience, projects, or skills!",
};

export default function AiAgent() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(CHAT_STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          setMessages(parsedHistory);
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Hide tooltip after 5 seconds or when chat opens
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: data.response,
        toolCalls: data.toolCalls, // Include tool calls in the message
        highlights: data.highlights, // Include highlighted keywords
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Handle navigation tool calls
      if (data.toolCalls) {
        data.toolCalls.forEach((toolCall) => {
          if (toolCall.action === "navigate" && toolCall.url) {
            // Navigate to page using Next.js router (no page reload)
            setTimeout(() => {
              router.push(toolCall.url);
            }, 500);
          } else if (toolCall.action === "resume_link" && toolCall.url) {
            // This will be rendered as a clickable link, no auto-navigation
          }
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "sorry, i'm having trouble responding right now. please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Clear chat history
  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    localStorage.removeItem(CHAT_STORAGE_KEY);
  };

  // Render text with highlighted keywords
  const renderHighlightedText = (text, highlights) => {
    if (!highlights || highlights.length === 0) {
      return <span>{text}</span>;
    }

    // Create a regex pattern that matches any of the highlight keywords (case-insensitive)
    const pattern = highlights
      .map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) // Escape special regex chars
      .join("|");
    const regex = new RegExp(`(${pattern})`, "gi");

    // Split text by the pattern and wrap matches in highlight spans
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) => {
          // Check if this part matches any highlight keyword (case-insensitive)
          const isHighlighted = highlights.some(
            (keyword) => keyword.toLowerCase() === part.toLowerCase()
          );

          if (isHighlighted) {
            return (
              <span
                key={index}
                className="bg-accent/20 text-accent font-semibold px-1 rounded"
              >
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  };

  // Render tool call actions (links, buttons)
  const renderToolCalls = (toolCalls) => {
    if (!toolCalls || toolCalls.length === 0) return null;

    return (
      <div className="mt-2 space-y-2">
        {toolCalls.map((toolCall, idx) => {
          if (toolCall.email) {
            return (
              <a
                key={idx}
                href={`mailto:${toolCall.email}`}
                className="inline-flex items-center gap-2 px-3 py-2 bg-accent hover:bg-accent-hover text-white rounded-md text-sm transition-colors"
              >
                <Mail size={16} />
                {toolCall.email}
              </a>
            );
          }

          if (toolCall.action === "resume_link" && toolCall.url) {
            return (
              <a
                key={idx}
                href={toolCall.url}
                className="inline-flex items-center gap-2 px-3 py-2 bg-accent hover:bg-accent-hover text-white rounded-md text-sm transition-colors"
              >
                <ExternalLink size={16} />
                {`view ${toolCall.tab.toLowerCase()}`}
              </a>
            );
          }

          if (toolCall.url) {
            return (
              <a
                key={idx}
                href={toolCall.url}
                target={toolCall.platform === "cv" ? "_blank" : "_blank"}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-accent hover:bg-accent-hover text-white rounded-md text-sm transition-colors"
              >
                <ExternalLink size={16} />
                {toolCall.platform === "cv"
                  ? "view resume/cv"
                  : `view ${toolCall.platform.toLowerCase()}`}
              </a>
            );
          }

          return null;
        })}
      </div>
    );
  };

  return (
    <>
      {/* Tooltip Popup */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-28 z-50 bg-accent text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap"
          >
            ask me questions about kyle!
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-accent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent-hover text-primary-foreground rounded-full p-4 shadow-lg transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-[400px] h-[600px] border rounded-lg shadow-2xl flex flex-col overflow-hidden"
            style={{
              backgroundColor: "var(--color-secondary)",
              borderColor: "var(--color-border)",
            }}
          >
            {/* Header */}
            <div
              className="bg-accent p-4 border-b"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <Bot size={20} />
                    ask about kyle
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    powered by gemini and lightrag
                  </p>
                </div>
                <button
                  onClick={handleClearChat}
                  className="text-white/70 hover:text-white transition-colors"
                  title="Clear chat history"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white">
                        <Bot size={18} />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-accent text-white" : ""
                      }`}
                      style={
                        message.role === "assistant"
                          ? {
                              backgroundColor: "var(--color-primary)",
                              color: "var(--color-text)",
                              border: "1px solid var(--color-border)",
                            }
                          : {}
                      }
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.role === "assistant"
                          ? renderHighlightedText(
                              message.content,
                              message.highlights
                            )
                          : message.content}
                      </p>
                      {message.role === "assistant" &&
                        renderToolCalls(message.toolCalls)}
                    </div>

                    {message.role === "user" && (
                      <div
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: "var(--color-accent)",
                          opacity: 0.8,
                        }}
                      >
                        <User size={18} className="text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white">
                      <Bot size={18} />
                    </div>
                    <div
                      className="rounded-lg p-3 flex items-center gap-2"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <Loader2
                        size={16}
                        className="animate-spin"
                        style={{ color: "var(--color-text)" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        thinking...
                      </span>
                    </div>
                  </motion.div>
                )}

                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div
              className="p-4 border-t"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-secondary)",
              }}
            >
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="ask about projects, skills..."
                  disabled={isLoading}
                  className="flex-1"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text)",
                  }}
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-accent hover:bg-accent-hover text-white shrink-0 h-10 w-10 p-0"
                >
                  <Send size={20} />
                </Button>
              </div>
              <p
                className="text-xs text-center mt-2"
                style={{ color: "var(--color-text-muted)" }}
              >
                ai may make mistakes. double check all answers.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
