import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  chatWithAgent,
  getAgentHealth,
  indexUserData,
  initializeVectorStore,
  AgentChatRequest,
  ChatMessage,
} from "@/actions/agent";

export const agentKeys = {
  all: ["agent"] as const,
  health: () => [...agentKeys.all, "health"] as const,
  chat: (conversationId?: string) => [...agentKeys.all, "chat", conversationId] as const,
};

export function useAgentHealth() {
  return useQuery({
    queryKey: agentKeys.health(),
    queryFn: async () => {
      const response = await getAgentHealth();
      return response?.data || null;
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // 1 minute
  });
}

export function useChatWithAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AgentChatRequest) => chatWithAgent(request),
    onSuccess: (response) => {
      if (response.success) {
        // Optionally invalidate related queries
        queryClient.invalidateQueries({ queryKey: agentKeys.all });
      }
    },
    onError: (error) => {
      console.error('Agent chat error:', error);
    },
  });
}

export function useIndexUserData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => indexUserData(),
    onSuccess: (response) => {
      if (response.success) {
        // Refresh agent health after indexing
        queryClient.invalidateQueries({ queryKey: agentKeys.health() });
      }
    },
    onError: (error) => {
      console.error('Error indexing user data:', error);
    },
  });
}

export function useInitializeVectorStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => initializeVectorStore(),
    onSuccess: (response) => {
      if (response.success) {
        // Refresh agent health after initialization
        queryClient.invalidateQueries({ queryKey: agentKeys.health() });
      }
    },
    onError: (error) => {
      console.error('Error initializing vector store:', error);
    },
  });
}