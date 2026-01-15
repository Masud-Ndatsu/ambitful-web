import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  saveJob,
  unsaveJob,
  getSavedJobs,
  likeJob,
  unlikeJob,
  getLikedJobs,
  applyToOpportunity,
  getUserApplications,
  getAdminOpportunities,
  updateOpportunityStatus,
  getOpportunityStats,
  getRecommendations,
} from "@/actions/opportunities";
import {
  OpportunityFilters,
  RecommendationResult,
  SavedJobsResponse,
  LikedJobsResponse,
} from "@/types/opportunity";
import { CreateOpportunityApiData } from "@/validations";

export const opportunityKeys = {
  all: ["opportunities"] as const,
  lists: () => [...opportunityKeys.all, "list"] as const,
  list: (filters: OpportunityFilters) =>
    [...opportunityKeys.lists(), filters] as const,
  details: () => [...opportunityKeys.all, "detail"] as const,
  detail: (id: string) => [...opportunityKeys.details(), id] as const,
  saved: () => [...opportunityKeys.all, "saved"] as const,
  liked: () => [...opportunityKeys.all, "liked"] as const,
  applications: () => [...opportunityKeys.all, "applications"] as const,
  recommendations: () => [...opportunityKeys.all, "recommendations"] as const,
  admin: () => [...opportunityKeys.all, "admin"] as const,
  adminList: (filters: OpportunityFilters) =>
    [...opportunityKeys.admin(), "list", filters] as const,
  stats: () => [...opportunityKeys.admin(), "stats"] as const,
};
export function useOpportunities(
  filters: OpportunityFilters = {},
  requireAuth: boolean = false
) {
  const defaultFilters = {
    page: 1,
    limit: 10,
    ...filters,
  };

  return useQuery({
    queryKey: opportunityKeys.list(defaultFilters),
    queryFn: async () => {
      const response = await getOpportunities(defaultFilters, requireAuth);
      return (
        response?.data || {
          opportunities: [],
          pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
        }
      );
    },
  });
}

export function useOpportunity(id: string) {
  return useQuery({
    queryKey: opportunityKeys.detail(id),
    queryFn: async () => {
      const response = await getOpportunityById(id);
      return response?.data || null;
    },
    enabled: !!id,
  });
}

export function useSavedJobs() {
  return useQuery({
    queryKey: opportunityKeys.saved(),
    queryFn: async (): Promise<SavedJobsResponse | null> => {
      const response = await getSavedJobs();
      return response?.data || null;
    },
  });
}

export function useLikedJobs() {
  return useQuery({
    queryKey: opportunityKeys.liked(),
    queryFn: async (): Promise<LikedJobsResponse | null> => {
      const response = await getLikedJobs();
      return response?.data || null;
    },
  });
}

export function useUserApplications() {
  return useQuery({
    queryKey: opportunityKeys.applications(),
    queryFn: async () => {
      const response = await getUserApplications();
      return response?.data || [];
    },
  });
}

export function useCreateOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOpportunityApiData) => createOpportunity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: opportunityKeys.lists() });
    },
  });
}

export function useUpdateOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateOpportunityApiData>;
    }) => updateOpportunity(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: opportunityKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: opportunityKeys.lists() });
    },
  });
}

export function useDeleteOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOpportunity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: opportunityKeys.lists() });
    },
  });
}

export function useSaveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (opportunityId: string) => saveJob(opportunityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: opportunityKeys.saved() });
      queryClient.invalidateQueries({ queryKey: opportunityKeys.lists() });
    },
  });
}

export function useUnsaveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (opportunityId: string) => unsaveJob(opportunityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: opportunityKeys.saved() });
      queryClient.invalidateQueries({ queryKey: opportunityKeys.lists() });
    },
  });
}

export function useLikeJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (opportunityId: string) => likeJob(opportunityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: opportunityKeys.liked() });
      queryClient.invalidateQueries({ queryKey: opportunityKeys.lists() });
    },
  });
}

export function useUnlikeJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (opportunityId: string) => unlikeJob(opportunityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: opportunityKeys.liked() });
      queryClient.invalidateQueries({ queryKey: opportunityKeys.lists() });
    },
  });
}

export function useApplyToOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      opportunityId,
      applicationData,
    }: {
      opportunityId: string;
      applicationData?: any;
    }) => applyToOpportunity(opportunityId, applicationData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: opportunityKeys.applications(),
      });
      queryClient.invalidateQueries({ queryKey: opportunityKeys.lists() });
    },
  });
}

export function useAdminOpportunities(filters: OpportunityFilters = {}) {
  const defaultFilters = {
    page: 1,
    limit: 10,
    ...filters,
  };

  return useQuery({
    queryKey: opportunityKeys.adminList(defaultFilters),
    queryFn: async () => {
      const response = await getAdminOpportunities(defaultFilters);
      return (
        response?.data || {
          opportunities: [],
          pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
        }
      );
    },
  });
}

export function useOpportunityStats() {
  return useQuery({
    queryKey: opportunityKeys.stats(),
    queryFn: async () => {
      const response = await getOpportunityStats();
      return (
        response?.data || {
          total: 0,
          published: 0,
          draft: 0,
          archived: 0,
          totalApplications: 0,
          recentApplications: 0,
        }
      );
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateOpportunityStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "published" | "draft" | "archived";
    }) => updateOpportunityStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: opportunityKeys.admin() });
      queryClient.invalidateQueries({ queryKey: opportunityKeys.stats() });
    },
  });
}

// AI-Powered Recommendations
export function useRecommendations(
  limit: number = 10,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: [...opportunityKeys.recommendations(), limit],
    queryFn: async (): Promise<RecommendationResult> => {
      const response = await getRecommendations(limit);
      console.log({ response });
      return (
        response?.data || {
          recommendations: [],
        }
      );
    },
    enabled,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });
}
