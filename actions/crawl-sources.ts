"use server";

import { makeRequest, ApiResponse } from "@/lib/api";
import { getAuthToken } from "@/actions/auth";
import { revalidatePath } from "next/cache";

export interface CrawlSource {
  id: string;
  name: string;
  url: string;
  frequency: "DAILY" | "WEEKLY" | "MONTHLY";
  status: "ACTIVE" | "INACTIVE" | "ERROR";
  cssSelectors: string | null;
  lastCrawledAt: string | null;
  nextCrawlAt: string | null;
  opportunitiesFound: number;
  isActive: boolean;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CrawlSourceListResponse {
  crawlSources: CrawlSource[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface CreateCrawlSourceData {
  name: string;
  url: string;
  frequency: "DAILY" | "WEEKLY" | "MONTHLY";
  cssSelectors?: string;
}

export interface CrawlSourceFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: "ACTIVE" | "INACTIVE" | "ERROR";
  frequency?: "DAILY" | "WEEKLY" | "MONTHLY";
  isActive?: boolean;
}

// Get all crawl sources
export async function getCrawlSources(
  filters: CrawlSourceFilters = {}
): Promise<ApiResponse<CrawlSourceListResponse>> {
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
      ? `/crawl-sources?${queryString}`
      : "/crawl-sources";

    const response = await makeRequest<CrawlSourceListResponse>(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

// Get crawl source by ID
export async function getCrawlSourceById(
  id: string
): Promise<ApiResponse<CrawlSource>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<CrawlSource>(`/crawl-sources/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

// Create crawl source
export async function createCrawlSource(
  data: CreateCrawlSourceData
): Promise<ApiResponse<CrawlSource>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<CrawlSource>("/crawl-sources", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    revalidatePath("/x/admin/settings");
    return response;
  } catch (error) {
    throw error;
  }
}

// Update crawl source
export async function updateCrawlSource(
  id: string,
  data: Partial<CreateCrawlSourceData>
): Promise<ApiResponse<CrawlSource>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<CrawlSource>(`/crawl-sources/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    revalidatePath("/x/admin/settings");
    return response;
  } catch (error) {
    throw error;
  }
}

// Delete crawl source
export async function deleteCrawlSource(
  id: string
): Promise<ApiResponse<void>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<void>(`/crawl-sources/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/x/admin/settings");
    return response;
  } catch (error) {
    throw error;
  }
}

// Trigger crawl
export async function triggerCrawl(
  id: string
): Promise<ApiResponse<{ message: string; opportunitiesCreated: number }>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<{
      message: string;
      opportunitiesCreated: number;
    }>(`/crawl-sources/${id}/trigger`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/x/admin/settings");
    revalidatePath("/x/admin/opportunities");
    return response;
  } catch (error) {
    throw error;
  }
}
