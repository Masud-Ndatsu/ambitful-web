"use server";

import { makeRequest, ApiResponse } from "@/lib/api";
import { getAuthToken } from "@/actions/auth";
import { revalidatePath } from "next/cache";

export interface CrawlError {
  id: string;
  type: "NETWORK" | "API" | "PARSING" | "VALIDATION" | "UNKNOWN";
  message: string;
  stackTrace: string | null;
  context: any;
  createdAt: string;
}

export interface CrawlJob {
  id: string;
  crawlSourceId: string;
  status:
    | "QUEUED"
    | "ACTIVE"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED"
    | "RETRYING";
  queuedAt: string;
  startedAt: string | null;
  completedAt: string | null;
  duration: number | null;
  itemsProcessed: number;
  itemsCreated: number;
  itemsFailed: number;
  retryCount: number;
  maxRetries: number;
  errors: CrawlError[];
  crawlSource?: {
    id: string;
    name: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CrawlJobListResponse {
  jobs: CrawlJob[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface CrawlJobStats {
  total: number;
  queued: number;
  active: number;
  completed: number;
  failed: number;
  cancelled: number;
  retrying: number;
  successRate: number;
  averageDuration: number;
  totalItemsProcessed: number;
  totalItemsCreated: number;
}

export interface QueueMetrics {
  queueDepth: number;
  activeJobs: number;
  estimatedWaitTime: number;
  throughput: number;
}

export interface CrawlJobFilters {
  page?: number;
  limit?: number;
  status?:
    | "QUEUED"
    | "ACTIVE"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED"
    | "RETRYING";
  crawlSourceId?: string;
  startDate?: string;
  endDate?: string;
}

// Get all crawl jobs
export async function getCrawlJobs(
  filters: CrawlJobFilters = {}
): Promise<ApiResponse<CrawlJobListResponse>> {
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
    const endpoint = queryString ? `/crawl-jobs?${queryString}` : "/crawl-jobs";

    const response = await makeRequest<CrawlJobListResponse>(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

// Get crawl job by ID
export async function getCrawlJobById(
  id: string
): Promise<ApiResponse<CrawlJob>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<CrawlJob>(`/crawl-jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

// Get crawl job stats
export async function getCrawlJobStats(): Promise<ApiResponse<CrawlJobStats>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<CrawlJobStats>("/crawl-jobs/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

// Get queue metrics
export async function getQueueMetrics(): Promise<ApiResponse<QueueMetrics>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<QueueMetrics>(
      "/crawl-jobs/queue/metrics",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
}

// Cancel crawl job
export async function cancelCrawlJob(
  id: string
): Promise<ApiResponse<{ message: string }>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<{ message: string }>(
      `/crawl-jobs/${id}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidatePath("/x/admin/crawl-jobs");
    return response;
  } catch (error) {
    throw error;
  }
}

// Retry crawl job
export async function retryCrawlJob(
  id: string
): Promise<ApiResponse<{ message: string; newJobId: string }>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<{ message: string; newJobId: string }>(
      `/crawl-jobs/${id}/retry`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidatePath("/x/admin/crawl-jobs");
    return response;
  } catch (error) {
    throw error;
  }
}

// Cleanup old jobs
export async function cleanupOldJobs(
  daysOld: number = 30
): Promise<ApiResponse<{ message: string; deletedCount: number }>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<{
      message: string;
      deletedCount: number;
    }>("/crawl-jobs/cleanup", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: { daysOld },
    });

    revalidatePath("/x/admin/crawl-jobs");
    return response;
  } catch (error) {
    throw error;
  }
}
