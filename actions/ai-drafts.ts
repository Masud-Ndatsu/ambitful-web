"use server";

import { makeRequest, ApiResponse } from "@/lib/api";
import { getAuthToken } from "@/actions/auth";
import { revalidatePath } from "next/cache";

export interface AIDraft {
  id: string;
  title: string;
  organization: string;
  description: string;
  requirements: string[];
  benefits: string[];
  compensation: string | null;
  compensationType: string | null;
  locations: string[];
  isRemote: boolean;
  deadline: string;
  applicationUrl: string | null;
  contactEmail: string | null;
  experienceLevel: string | null;
  duration: string | null;
  eligibility: string[];
  status: "PENDING" | "CRAWLING" | "CRAWLED" | "APPROVED" | "REJECTED" | "PUBLISHED";
  reviewedBy: string | null;
  reviewedAt: string | null;
  rejectionReason: string | null;
  isDetailsCrawled: boolean;
  rawScrapedData: any | null;
  opportunityId: string | null;
  crawlSourceId: string;
  sourceUrl: string;
  rawData: string | null;
  createdAt: string;
  updatedAt: string;
  crawlSource?: {
    id: string;
    name: string;
    url: string;
  };
}

export interface AIDraftListResponse {
  drafts: AIDraft[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface AIDraftStatsResponse {
  total: number;
  pending: number;
  crawling: number;
  crawled: number;
  approved: number;
  rejected: number;
  published: number;
}

export interface AIDraftFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: "PENDING" | "CRAWLING" | "CRAWLED" | "APPROVED" | "REJECTED" | "PUBLISHED";
  crawlSourceId?: string;
  sortBy?: "createdAt" | "deadline" | "title" | "organization";
  sortOrder?: "asc" | "desc";
}

export interface CreateAIDraftData {
  title: string;
  organization: string;
  description: string;
  requirements?: string[];
  benefits?: string[];
  compensation?: string;
  compensationType?: string;
  locations: string[];
  isRemote?: boolean;
  deadline: string;
  applicationUrl?: string;
  contactEmail?: string;
  experienceLevel?: string;
  duration?: string;
  eligibility?: string[];
  crawlSourceId: string;
  sourceUrl: string;
  rawData?: string;
}

export interface ReviewAIDraftData {
  status: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}

export interface PublishAIDraftData {
  opportunityTypeIds: string[];
}

// Get all AI drafts
export async function getAIDrafts(
  filters: AIDraftFilters = {}
): Promise<ApiResponse<AIDraftListResponse>> {
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
    const endpoint = queryString ? `/ai-drafts?${queryString}` : "/ai-drafts";

    const response = await makeRequest<AIDraftListResponse>(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

// Get AI draft by ID
export async function getAIDraftById(
  id: string
): Promise<ApiResponse<AIDraft>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<AIDraft>(`/ai-drafts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

// Create AI draft
export async function createAIDraft(
  data: CreateAIDraftData
): Promise<ApiResponse<AIDraft>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<AIDraft>("/ai-drafts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    revalidatePath("/x/admin/ai-draft");
    return response;
  } catch (error) {
    throw error;
  }
}

// Update AI draft
export async function updateAIDraft(
  id: string,
  data: Partial<CreateAIDraftData>
): Promise<ApiResponse<AIDraft>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<AIDraft>(`/ai-drafts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    revalidatePath("/x/admin/ai-draft");
    return response;
  } catch (error) {
    throw error;
  }
}

// Delete AI draft
export async function deleteAIDraft(id: string): Promise<ApiResponse<void>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<void>(`/ai-drafts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/x/admin/ai-draft");
    return response;
  } catch (error) {
    throw error;
  }
}

// Review AI draft (approve/reject)
export async function reviewAIDraft(
  id: string,
  data: ReviewAIDraftData
): Promise<ApiResponse<AIDraft>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<AIDraft>(`/ai-drafts/${id}/review`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    revalidatePath("/x/admin/ai-draft");
    revalidatePath("/x/admin/dashboard");
    return response;
  } catch (error) {
    throw error;
  }
}

// Publish AI draft (convert to opportunity)
export async function publishAIDraft(
  id: string,
  data: PublishAIDraftData
): Promise<ApiResponse<AIDraft>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<AIDraft>(`/ai-drafts/${id}/publish`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    revalidatePath("/x/admin/ai-draft");
    revalidatePath("/x/admin/opportunities");
    revalidatePath("/x/admin/dashboard");
    return response;
  } catch (error) {
    throw error;
  }
}

// Get AI draft statistics
export async function getAIDraftStats(): Promise<
  ApiResponse<AIDraftStatsResponse>
> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<AIDraftStatsResponse>(
      "/ai-drafts/stats",
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

// Crawl details page for AI draft
export async function crawlAIDraftDetails(
  id: string,
  engine?: "SCRAPER_DO" | "CHEERIO" | "PLAYWRIGHT"
): Promise<ApiResponse<AIDraft>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<AIDraft>(
      `/ai-drafts/${id}/crawl-details`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { engine },
      }
    );

    revalidatePath("/x/admin/ai-draft");
    return response;
  } catch (error) {
    throw error;
  }
}

export interface BulkCrawlResponse {
  success: boolean;
  total: number;
  queued: number;
  failed: number;
  results: Array<{
    draftId: string;
    status: "queued" | "failed";
    error?: string;
  }>;
}

// Bulk crawl details for multiple AI drafts
export async function bulkCrawlAIDraftDetails(
  draftIds: string[],
  engine?: "SCRAPER_DO" | "CHEERIO" | "PLAYWRIGHT"
): Promise<ApiResponse<BulkCrawlResponse>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<BulkCrawlResponse>(
      `/ai-drafts/bulk-crawl`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { draftIds, engine },
      }
    );

    revalidatePath("/x/admin/ai-draft");
    return response;
  } catch (error) {
    throw error;
  }
}
