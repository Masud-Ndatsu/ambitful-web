"use server";
import { makeRequest, ApiResponse } from "@/lib/api";

export interface ChatMessage {
  role: 'user' | 'assistant';
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
  status: 'ready' | 'initializing' | 'error';
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

export async function indexUserData(): Promise<ApiResponse<{ indexed: boolean }>> {
  try {
    const response = await makeRequest<{ indexed: boolean }>("/agent/index-user-data", {
      method: "POST",
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function initializeVectorStore(): Promise<ApiResponse<{ initialized: boolean }>> {
  try {
    const response = await makeRequest<{ initialized: boolean }>("/agent/initialize-vector-store", {
      method: "POST",
    });

    return response;
  } catch (error) {
    throw error;
  }
}