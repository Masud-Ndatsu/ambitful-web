"use server";

import { makeRequest, ApiResponse } from "@/lib/api";
import { getAuthToken } from "@/actions/auth";
import { revalidatePath } from "next/cache";

// Import types from centralized location
import {
  CreateOpportunityData,
  Opportunity,
  OpportunityFilters,
  AdminOpportunityListResponse,
  OpportunityStatsResponse,
  RecommendationResult,
  SavedJobsResponse,
  LikedJobsResponse,
} from "@/types/opportunity";

// Server Actions
export async function getOpportunities(
  filters: OpportunityFilters = {},
  requireAuth: boolean = false
) {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    const queryString = params.toString();
    const endpoint = queryString
      ? `/opportunities?${queryString}`
      : "/opportunities";

    const headers: Record<string, string> = {};

    if (requireAuth) {
      const token = await getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return await makeRequest<{
      opportunities: Opportunity[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(endpoint, {
      headers: Object.keys(headers).length > 0 ? headers : undefined,
    });
  } catch (error) {
    throw error;
  }
}

export async function getOpportunityById(id: string) {
  try {
    return await makeRequest<Opportunity>(`/opportunities/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function createOpportunity(
  data: CreateOpportunityData
): Promise<ApiResponse<Opportunity>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<Opportunity>("/opportunities", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    revalidatePath("/x/admin/opportunities");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateOpportunity(
  id: string,
  data: Partial<CreateOpportunityData>
): Promise<ApiResponse<Opportunity>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<Opportunity>(`/opportunities/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    revalidatePath("/x/admin/opportunities");
    revalidatePath(`/opportunities/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteOpportunity(
  id: string
): Promise<ApiResponse<void>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest(`/opportunities/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/x/admin/opportunities");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function saveJob(
  opportunityId: string
): Promise<ApiResponse<void>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest("/opportunities/saved", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: { opportunityId },
    });

    revalidatePath("/x/opportunities");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function unsaveJob(
  opportunityId: string
): Promise<ApiResponse<void>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest(
      `/opportunities/saved/${opportunityId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidatePath("/x/opportunities");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSavedJobs(): Promise<ApiResponse<SavedJobsResponse>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    return await makeRequest<SavedJobsResponse>("/opportunities/saved/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
}

// Like/Unlike opportunities
export async function likeJob(
  opportunityId: string
): Promise<ApiResponse<any>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest("/opportunities/liked", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: { opportunityId },
    });

    revalidatePath("/x/opportunities");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function unlikeJob(
  opportunityId: string
): Promise<ApiResponse<any>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest(
      `/opportunities/liked/${opportunityId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidatePath("/x/opportunities");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getLikedJobs(): Promise<ApiResponse<LikedJobsResponse>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    return await makeRequest<LikedJobsResponse>("/opportunities/liked/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function applyToOpportunity(
  opportunityId: string,
  applicationData?: any
): Promise<ApiResponse<void>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest("/opportunities/apply", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: { opportunityId, ...applicationData },
    });

    revalidatePath("/x/opportunities");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getUserApplications(): Promise<ApiResponse<any[]>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    return await makeRequest<any[]>("/opportunities/applications/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
}

// Admin-specific opportunity management
export async function getAdminOpportunities(
  filters: OpportunityFilters = {}
): Promise<ApiResponse<AdminOpportunityListResponse>> {
  try {
    const token = await getAuthToken();

    console.log({ token });

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
      ? `/admin/opportunities?${queryString}`
      : "/admin/opportunities";

    const response = await makeRequest<AdminOpportunityListResponse>(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateOpportunityStatus(
  id: string,
  status: "published" | "draft" | "archived"
): Promise<ApiResponse<Opportunity>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<Opportunity>(
      `/admin/opportunities/${id}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { status },
      }
    );

    revalidatePath("/x/admin/opportunities");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getOpportunityStats(): Promise<
  ApiResponse<OpportunityStatsResponse>
> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    return await makeRequest<OpportunityStatsResponse>(
      "/admin/opportunities/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}

// AI-Powered Recommendations
export async function getRecommendations(
  limit: number = 10
): Promise<ApiResponse<RecommendationResult>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    return await makeRequest<RecommendationResult>(
      `/opportunities/recommendations?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}
