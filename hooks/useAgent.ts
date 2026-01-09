import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  chatWithAgent,
  AgentChatRequest,
  createConversation,
  getUserConversations,
  getConversation,
  updateConversation,
  deleteConversation,
  chatWithConversation,
} from "@/actions/agent";

export const agentKeys = {
  all: ["agent"] as const,
  health: () => [...agentKeys.all, "health"] as const,
  chat: (conversationId?: string) =>
    [...agentKeys.all, "chat", conversationId] as const,
  conversations: () => [...agentKeys.all, "conversations"] as const,
  conversation: (id: string) =>
    [...agentKeys.all, "conversations", id] as const,
};

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
      console.error("Agent chat error:", error);
    },
  });
}

// Conversation Management Hooks
export function useConversations() {
  return useQuery({
    queryKey: agentKeys.conversations(),
    queryFn: async () => {
      const response = await getUserConversations();
      return response?.data || [];
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useConversation(conversationId: string | null) {
  return useQuery({
    queryKey: agentKeys.conversation(conversationId || ""),
    queryFn: async () => {
      if (!conversationId) return null;
      const response = await getConversation(conversationId);
      return response?.data || null;
    },
    enabled: !!conversationId,
    staleTime: 10 * 1000, // 10 seconds
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title?: string) => createConversation(title),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: agentKeys.conversations() });
      }
    },
    onError: (error) => {
      console.error("Error creating conversation:", error);
    },
  });
}

export function useUpdateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      title,
    }: {
      conversationId: string;
      title: string;
    }) => updateConversation(conversationId, title),
    onSuccess: (response, variables) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: agentKeys.conversations() });
        queryClient.invalidateQueries({
          queryKey: agentKeys.conversation(variables.conversationId),
        });
      }
    },
    onError: (error) => {
      console.error("Error updating conversation:", error);
    },
  });
}

export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) => deleteConversation(conversationId),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: agentKeys.conversations() });
      }
    },
    onError: (error) => {
      console.error("Error deleting conversation:", error);
    },
  });
}

export function useChatWithConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      message,
    }: {
      conversationId: string;
      message: string;
    }) => chatWithConversation(conversationId, message),
    onSuccess: (response, variables) => {
      if (response.success) {
        // Refresh the conversation to get updated messages
        queryClient.invalidateQueries({
          queryKey: agentKeys.conversation(variables.conversationId),
        });
        queryClient.invalidateQueries({ queryKey: agentKeys.conversations() });
      }
    },
    onError: (error) => {
      console.error("Error chatting with conversation:", error);
    },
  });
}
