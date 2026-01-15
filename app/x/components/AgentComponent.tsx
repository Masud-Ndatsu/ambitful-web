"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { Send, Bot } from "lucide-react";
import React, { useState } from "react";

interface AgentComponentProps {
  user: User | null;
  askAiPayload?: {
    opportunityId: string;
    title: string;
    organisation: string;
  };
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AgentComponent({}: AgentComponentProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hi there! I'm your AI Career Agent. I'm here to help you find amazing career opportunities. What brings you here today?`,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content:
        "Hi there! I'm your AI Career Agent. I'm here to help you find amazing career opportunities. What brings you here today?",
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <aside className="flex-1 w-lg bg-white border-l border-[#E3E3E3] hidden lg:flex flex-col h-full">
      {/* Header */}
      <header className="border-b border-[#E3E3E3] p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[#E8F5F1] flex items-center justify-center">
          <Bot className="h-5 w-5 text-[#03624C]" />
        </div>
        <div>
          <h2 className="text-[1.4rem] font-semibold text-[#1A1D23]">
            AI Career Agent
          </h2>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <div className="h-8 w-8 rounded-full bg-[#E8F5F1] flex items-center justify-center shrink-0 mr-2">
                <Bot className="h-4 w-4 text-[#03624C]" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-[1.2rem] ${
                message.role === "user"
                  ? "bg-[#03624C] text-white"
                  : "bg-[#F6F8FB] text-[#1A1D23]"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#E3E3E3]">
        <div className="flex items-center gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 h-12 rounded-xl border-[#E3E3E3] text-[1.2rem] px-4"
            placeholder="Ask AI anything"
          />
          <Button
            onClick={handleSend}
            className="h-12 w-12 rounded-xl bg-[#03624C] hover:bg-[#03624C]/90 p-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
