import { useState, useCallback } from "react";

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  data?: any;
  suggestions?: string[];
  timestamp: Date;
}

interface ConversationExport {
  userId?: string;
  userName?: string;
  exportDate: string;
  messageCount: number;
  messages: ConversationMessage[];
}

export function useConversation() {
  const [conversationId, setConversationId] = useState<string | null>(null);

  const exportConversation = useCallback((
    messages: ConversationMessage[],
    userInfo?: { id: string; name: string }
  ): ConversationExport => {
    return {
      userId: userInfo?.id,
      userName: userInfo?.name,
      exportDate: new Date().toISOString(),
      messageCount: messages.length,
      messages: messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp,
      })),
    };
  }, []);

  const downloadConversation = useCallback((
    messages: ConversationMessage[],
    userInfo?: { id: string; name: string },
    format: 'json' | 'txt' = 'json'
  ) => {
    const conversation = exportConversation(messages, userInfo);
    
    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === 'json') {
      content = JSON.stringify(conversation, null, 2);
      filename = `conversation_${new Date().toISOString().split('T')[0]}.json`;
      mimeType = 'application/json';
    } else {
      content = formatAsText(conversation);
      filename = `conversation_${new Date().toISOString().split('T')[0]}.txt`;
      mimeType = 'text/plain';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [exportConversation]);

  const copyConversation = useCallback((
    messages: ConversationMessage[],
    userInfo?: { id: string; name: string }
  ) => {
    const conversation = exportConversation(messages, userInfo);
    const textContent = formatAsText(conversation);
    
    navigator.clipboard.writeText(textContent).then(() => {
      // You might want to show a toast notification here
      console.log('Conversation copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy conversation:', err);
    });
  }, [exportConversation]);

  const saveConversation = useCallback((
    messages: ConversationMessage[],
    title?: string
  ) => {
    // Save to localStorage for now - could be enhanced to save to backend
    const conversationData = {
      id: conversationId || generateConversationId(),
      title: title || `Conversation ${new Date().toLocaleDateString()}`,
      messages,
      savedAt: new Date().toISOString(),
    };

    const existingConversations = getStoredConversations();
    const updatedConversations = [...existingConversations, conversationData];
    
    localStorage.setItem('agent_conversations', JSON.stringify(updatedConversations));
    
    if (!conversationId) {
      setConversationId(conversationData.id);
    }

    return conversationData.id;
  }, [conversationId]);

  const getStoredConversations = useCallback(() => {
    try {
      const stored = localStorage.getItem('agent_conversations');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error retrieving stored conversations:', error);
      return [];
    }
  }, []);

  const deleteConversation = useCallback((id: string) => {
    const conversations = getStoredConversations();
    const filtered = conversations.filter((conv: any) => conv.id !== id);
    localStorage.setItem('agent_conversations', JSON.stringify(filtered));
  }, [getStoredConversations]);

  return {
    conversationId,
    setConversationId,
    exportConversation,
    downloadConversation,
    copyConversation,
    saveConversation,
    getStoredConversations,
    deleteConversation,
  };
}

function formatAsText(conversation: ConversationExport): string {
  const header = `
=== AI Career Assistant Conversation ===
Export Date: ${new Date(conversation.exportDate).toLocaleString()}
User: ${conversation.userName || 'Anonymous'}
Messages: ${conversation.messageCount}

`.trim();

  const messages = conversation.messages.map((msg, index) => {
    const timestamp = new Date(msg.timestamp).toLocaleTimeString();
    const role = msg.role === 'user' ? 'You' : 'AI Assistant';
    
    let content = `[${timestamp}] ${role}: ${msg.content}`;
    
    if (msg.suggestions && msg.suggestions.length > 0) {
      content += `\nSuggestions: ${msg.suggestions.join(', ')}`;
    }
    
    return content;
  }).join('\n\n');

  return `${header}\n\n${messages}`;
}

function generateConversationId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}