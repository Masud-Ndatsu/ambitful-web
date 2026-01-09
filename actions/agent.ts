"use server";
import { makeRequest, ApiResponse } from "@/lib/api";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface AgentChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

export interface AgentResponse {
  message: string;
  data?: any;
  suggestions?: string[];
}

export interface AgentHealth {
  status: "ready" | "initializing" | "error";
  tools: string[];
  vectorStore: boolean;
}

export async function chatWithAgent(
  request: AgentChatRequest
): Promise<ApiResponse<AgentResponse>> {
  try {
    const response = await makeRequest<AgentResponse>("/agent/chat", {
      method: "POST",
      body: request,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAgentHealth(): Promise<ApiResponse<AgentHealth>> {
  try {
    const response = await makeRequest<AgentHealth>("/agent/health", {
      method: "GET",
    });

    return response;
  } catch (error) {
    throw error;
  }
}

// Conversation Management
export interface Conversation {
  id: string;
  userId: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
}

export interface Message {
  id: string;
  conversationId: string;
  role: "USER" | "ASSISTANT" | "SYSTEM";
  content: string;
  data?: any;
  suggestions?: string[];
  createdAt: string;
}

export async function createConversation(
  title?: string
): Promise<ApiResponse<Conversation>> {
  try {
    const response = await makeRequest<Conversation>("/agent/conversations", {
      method: "POST",
      body: { title },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getUserConversations(): Promise<
  ApiResponse<Conversation[]>
> {
  try {
    const response = await makeRequest<Conversation[]>("/agent/conversations", {
      method: "GET",
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getConversation(
  conversationId: string
): Promise<ApiResponse<Conversation>> {
  try {
    const response = await makeRequest<Conversation>(
      `/agent/conversations/${conversationId}`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateConversation(
  conversationId: string,
  title: string
): Promise<ApiResponse<Conversation>> {
  try {
    const response = await makeRequest<Conversation>(
      `/agent/conversations/${conversationId}`,
      {
        method: "PATCH",
        body: { title },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteConversation(
  conversationId: string
): Promise<ApiResponse<null>> {
  try {
    const response = await makeRequest<null>(
      `/agent/conversations/${conversationId}`,
      {
        method: "DELETE",
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function chatWithConversation(
  conversationId: string,
  message: string
): Promise<ApiResponse<AgentResponse>> {
  try {
    const response = await makeRequest<AgentResponse>(
      "/agent/conversations/chat",
      {
        method: "POST",
        body: { conversationId, message },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
}
