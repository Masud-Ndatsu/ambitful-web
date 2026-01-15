"use client";

import { useEffect, useCallback } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { useQueryClient } from "@tanstack/react-query";

interface DraftStatusUpdate {
  draftId: string;
  status:
    | "PENDING"
    | "CRAWLING"
    | "CRAWLED"
    | "APPROVED"
    | "REJECTED"
    | "PUBLISHED";
  timestamp: Date;
  draft?: {
    id: string;
    title: string;
    organization: string;
    status: string;
  };
}

interface UseDraftMonitoringOptions {
  draftId?: string;
  onStatusUpdate?: (update: DraftStatusUpdate) => void;
}

export const useDraftMonitoring = (options?: UseDraftMonitoringOptions) => {
  const { socket, isConnected } = useSocket();
  const queryClient = useQueryClient();

  const handleStatusUpdate = useCallback(
    (update: DraftStatusUpdate) => {
      console.log("Draft status update received:", update);

      // Invalidate and refetch queries immediately
      queryClient.invalidateQueries({
        queryKey: ["aiDrafts"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["ai-drafts"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["ai-draft", update.draftId],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["aiDraftStats"],
        refetchType: "active",
      });

      // Call custom callback if provided
      if (options?.onStatusUpdate) {
        options.onStatusUpdate(update);
      }
    },
    [queryClient, options]
  );

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Subscribe to specific draft or all drafts
    if (options?.draftId) {
      socket.emit("subscribe:draft", options.draftId);
      console.log("Subscribed to draft:", options.draftId);
    } else {
      socket.emit("subscribe:all-drafts");
      console.log("Subscribed to all drafts");
    }

    // Listen for status updates
    socket.on("draft:status-update", handleStatusUpdate);

    return () => {
      // Cleanup subscriptions
      if (options?.draftId) {
        socket.emit("unsubscribe:draft", options.draftId);
      } else {
        socket.emit("unsubscribe:all-drafts");
      }

      socket.off("draft:status-update", handleStatusUpdate);
    };
  }, [socket, isConnected, options?.draftId, handleStatusUpdate]);

  return { isConnected };
};
