"use client";
import {
  Bot,
  Send,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Plus,
  MessageSquare,
  Trash2,
} from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  useAgentHealth,
  useIndexUserData,
  useConversations,
  useConversation,
  useCreateConversation,
  useChatWithConversation,
  useDeleteConversation,
} from "@/hooks/useAgent";
import { useAuth } from "@/hooks/useAuthentication";

interface DisplayMessage {
  role: "USER" | "ASSISTANT" | "SYSTEM";
  content: string;
  data?: any;
  suggestions?: string[];
  timestamp: Date;
}

export default function AgentPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hooks
  const { data: agentHealth, isLoading: healthLoading } = useAgentHealth();
  const { data: conversations = [], isLoading: conversationsLoading } =
    useConversations();
  const { data: currentConversation } = useConversation(currentConversationId);
  const createConversationMutation = useCreateConversation();
  const chatMutation = useChatWithConversation();
  const deleteConversationMutation = useDeleteConversation();
  const indexUserMutation = useIndexUserData();

  const isLoading = chatMutation.isPending;

  // Convert database messages to display format
  const messages: DisplayMessage[] = useMemo(
    () =>
      currentConversation?.messages?.map((msg) => ({
        role: msg.role,
        content: msg.content,
        data: msg.data,
        suggestions: msg.suggestions,
        timestamp: new Date(msg.createdAt),
      })) || [],
    [currentConversation?.messages]
  );

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Index user data on first load
  useEffect(() => {
    if (user && agentHealth?.status === "ready") {
      indexUserMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, agentHealth?.status]);

  // Auto-select first conversation or create one
  useEffect(() => {
    // Use a flag to prevent multiple state updates
    let shouldUpdate = false;

    if (
      !conversationsLoading &&
      conversations.length > 0 &&
      !currentConversationId
    ) {
      shouldUpdate = true;
      // Use setTimeout to defer state update to next tick
      setTimeout(() => {
        setCurrentConversationId(conversations[0].id);
      }, 0);
    } else if (
      !conversationsLoading &&
      conversations.length === 0 &&
      !currentConversationId &&
      !shouldUpdate
    ) {
      // Create initial conversation
      createConversationMutation.mutate("New Conversation", {
        onSuccess: (response) => {
          if (response.success && response.data) {
            setCurrentConversationId(response.data.id);
          }
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationsLoading, conversations, currentConversationId]);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading || !currentConversationId) return;

    const userMessage = message;
    setMessage("");

    // Show typing indicator
    setIsTyping(true);

    try {
      const response = await chatMutation.mutateAsync({
        conversationId: currentConversationId,
        message: userMessage,
      });

      setIsTyping(false);

      if (!response.success) {
        // Handle error
        console.error("Chat error:", response.message);
      }
    } catch (error) {
      setIsTyping(false);
      console.error("Chat error:", error);
    }
  };

  const handleNewConversation = () => {
    createConversationMutation.mutate("New Conversation", {
      onSuccess: (response) => {
        if (response.success && response.data) {
          setCurrentConversationId(response.data.id);
        }
      },
    });
  };

  const handleDeleteConversation = (conversationId: string) => {
    deleteConversationMutation.mutate(conversationId, {
      onSuccess: () => {
        if (currentConversationId === conversationId) {
          setCurrentConversationId(null);
        }
      },
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    // Auto-focus the input after clicking a suggestion
    setTimeout(() => {
      const textarea = document.querySelector("textarea");
      textarea?.focus();
    }, 100);
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
    <div className="h-screen flex bg-[#F6F8FB]">
      {/* Conversations Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={handleNewConversation}
            disabled={createConversationMutation.isPending}
            className="w-full flex items-center justify-center gap-2 bg-[#03624C] text-white px-4 py-2 rounded-lg hover:bg-[#024a3a] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span className="text-[1.4rem]">New Conversation</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {conversationsLoading ? (
            <div className="flex items-center justify-center p-4">
              <RefreshCw className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center p-4 text-gray-500 text-[1.3rem]">
              No conversations yet
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setCurrentConversationId(conv.id)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-colors group cursor-pointer ${
                  currentConversationId === conv.id
                    ? "bg-[#03624C]/10 border border-[#03624C]"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-400 shrink-0" />
                      <p className="text-[1.4rem] font-medium text-gray-900 truncate">
                        {conv.title || "Untitled Conversation"}
                      </p>
                    </div>
                    <p className="text-[1.2rem] text-gray-500 mt-1">
                      {new Date(conv.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteConversation(conv.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
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
                msg.role === "USER" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "USER"
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

          {(isLoading || isTyping) && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#03624C] rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#03624C] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-[#03624C] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-[#03624C] rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-[1.4rem] text-gray-600">
                    {isTyping
                      ? "AI is thinking..."
                      : "Processing your request..."}
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
                className="w-full px-4 py-3 text-[1.6rem] text-background border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-[#03624C] focus:ring-2 focus:ring-[#03624C]/20"
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
    </div>
  );
}
