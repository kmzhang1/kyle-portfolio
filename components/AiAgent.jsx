"use client";

import { useState, useRef, useEffect } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Kyle's AI assistant. Ask me anything about his experience, projects, or skills!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Handle navigation tool calls
      if (data.toolCalls) {
        data.toolCalls.forEach((toolCall) => {
          if (toolCall.action === "navigate" && toolCall.url) {
            // Navigate to page
            setTimeout(() => {
              window.location.href = toolCall.url;
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
            "Sorry, I'm having trouble responding right now. Please try again later.",
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
                {`View ${toolCall.tab.charAt(0).toUpperCase() + toolCall.tab.slice(1)}`}
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
                  ? "View Resume/CV"
                  : `View ${
                      toolCall.platform.charAt(0).toUpperCase() +
                      toolCall.platform.slice(1)
                    }`}
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
              <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                <Bot size={20} />
                Ask About Kyle
              </h3>
              <p className="text-xs text-white/80 mt-1">
                Powered by Google Gemini with Document RAG
              </p>
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
                        {message.content}
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
                        Thinking...
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
                  placeholder="Ask about projects, skills..."
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
                AI may make mistakes. Double check all answers.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
