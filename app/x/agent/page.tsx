"use client";
import { Bot, Send, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  useAgentHealth,
  useChatWithAgent,
  useIndexUserData,
} from "@/hooks/useAgent";
import { ChatMessage } from "@/actions/agent";
import { useAuth } from "@/hooks/useAuthentication";

interface DisplayMessage {
  role: "user" | "assistant";
  content: string;
  data?: any;
  suggestions?: string[];
  timestamp: Date;
}

export default function AgentPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<DisplayMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI career assistant. I can help you find opportunities, optimize your applications, and provide career guidance. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hooks
  const { data: agentHealth, isLoading: healthLoading } = useAgentHealth();
  const chatMutation = useChatWithAgent();
  const indexUserMutation = useIndexUserData();

  const isLoading = chatMutation.isPending;

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Index user data on first load
  useEffect(() => {
    if (user && agentHealth?.status === "ready") {
      indexUserMutation.mutate();
    }
  }, [user, agentHealth?.status, indexUserMutation]);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message;
    setMessage("");

    // Add user message
    const newUserMessage: DisplayMessage = {
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // Prepare conversation history
    const conversationHistory: ChatMessage[] = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp.toISOString(),
    }));

    try {
      const response = await chatMutation.mutateAsync({
        message: userMessage,
        conversationHistory,
      });

      if (response.success && response.data) {
        const assistantMessage: DisplayMessage = {
          role: "assistant",
          content: response.data.message,
          data: response.data.data,
          suggestions: response.data.suggestions,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      const errorMessage: DisplayMessage = {
        role: "assistant",
        content:
          "I apologize, but I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderOpportunityData = (data: any) => {
    if (!data?.opportunities) return null;

    return (
      <div className="mt-3 space-y-3">
        {data.opportunities.map((opp: any, index: number) => (
          <div
            key={opp.id || index}
            className="bg-gray-50 rounded-lg p-3 border"
          >
            <h4 className="font-semibold text-[1.5rem] text-gray-900">
              {opp.title}
            </h4>
            <p className="text-[1.4rem] text-gray-600">{opp.organization}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {opp.locations && (
                <span className="text-[1.2rem] bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  📍{" "}
                  {Array.isArray(opp.locations)
                    ? opp.locations.join(", ")
                    : opp.locations}
                </span>
              )}
              {opp.compensation && (
                <span className="text-[1.2rem] bg-green-100 text-green-800 px-2 py-1 rounded">
                  💰 {opp.compensation}
                </span>
              )}
              {opp.remote && (
                <span className="text-[1.2rem] bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  🏠 Remote
                </span>
              )}
            </div>
            {opp.description && (
              <p className="text-[1.3rem] text-gray-700 mt-2">
                {opp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-[#F6F8FB]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#03624C] rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[2.4rem] font-semibold text-gray-900">
                AI Career Assistant
              </h1>
              <p className="text-[1.6rem] text-gray-600">
                Your personal career guidance AI
              </p>
            </div>
          </div>

          {/* Agent Status */}
          <div className="flex items-center gap-3">
            {healthLoading ? (
              <RefreshCw className="w-5 h-5 animate-spin text-gray-400" />
            ) : (
              <>
                {agentHealth?.status === "ready" ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-[1.4rem]">Ready</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-orange-600">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-[1.4rem]">
                      {agentHealth?.status === "initializing"
                        ? "Initializing"
                        : "Offline"}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Tools Status */}
        {agentHealth?.tools && (
          <div className="mt-4 flex flex-wrap gap-2">
            {agentHealth.tools.map((tool) => (
              <span
                key={tool}
                className="text-[1.2rem] bg-[#03624C]/10 text-[#03624C] px-2 py-1 rounded-full"
              >
                {tool.replace("_", " ")}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-[#03624C] text-white"
                  : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              <p className="text-[1.6rem] leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>

              {/* Render structured data */}
              {msg.data && renderOpportunityData(msg.data)}

              {/* Suggestions */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-[1.3rem] font-medium text-gray-600">
                    Suggestions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {msg.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-[1.3rem] bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-[1.2rem] text-gray-500 mt-2">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
                <span className="text-[1.4rem] text-gray-500">
                  AI is thinking...
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-6">
        {agentHealth?.status !== "ready" && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-[1.4rem] text-orange-700">
              AI Agent is{" "}
              {agentHealth?.status === "initializing"
                ? "starting up"
                : "offline"}
              . Please wait a moment for full functionality.
            </p>
          </div>
        )}

        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me about career opportunities, application tips, or anything else..."
              className="w-full px-4 py-3 text-[1.6rem] border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-[#03624C] focus:ring-2 focus:ring-[#03624C]/20"
              rows={3}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            className="bg-[#03624C] text-white p-3 rounded-xl hover:bg-[#024d3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
