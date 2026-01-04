"use server";

import { makeRequest, ApiResponse } from "@/lib/api";
import { getAuthToken } from "@/actions/auth";

export interface ActivityLog {
  id: string;
  userId: string;
  action: "CREATED" | "UPDATED" | "DELETED" | "APPROVED" | "REJECTED" | "PUBLISHED" | "CANCELLED" | "RETRIED";
  entityType: string;
  entityId: string;
  description: string;
  metadata: Record<string, any> | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
}

export interface ActivityLogListResponse {
  activities: ActivityLog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ActivityLogFilters {
  page?: number;
  limit?: number;
}

// Get recent activity logs
export async function getRecentActivities(
  filters: ActivityLogFilters = {}
): Promise<ApiResponse<ActivityLogListResponse>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    const queryString = params.toString();
    const endpoint = queryString
      ? `/activity-logs?${queryString}`
      : "/activity-logs";

    const response = await makeRequest<ActivityLogListResponse>(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

// Get activities for a specific user
export async function getUserActivities(
  userId: string,
  filters: ActivityLogFilters = {}
): Promise<ApiResponse<ActivityLogListResponse>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    const queryString = params.toString();
    const endpoint = queryString
      ? `/activity-logs/user/${userId}?${queryString}`
      : `/activity-logs/user/${userId}`;

    const response = await makeRequest<ActivityLogListResponse>(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

