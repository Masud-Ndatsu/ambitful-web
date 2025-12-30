import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCrawlSources,
  getCrawlSourceById,
  createCrawlSource,
  updateCrawlSource,
  deleteCrawlSource,
  triggerCrawl,
  CrawlSourceFilters,
  CreateCrawlSourceData,
} from "@/actions/crawl-sources";

export const crawlSourceKeys = {
  all: ["crawlSources"] as const,
  lists: () => [...crawlSourceKeys.all, "list"] as const,
  list: (filters: CrawlSourceFilters) =>
    [...crawlSourceKeys.lists(), filters] as const,
  details: () => [...crawlSourceKeys.all, "detail"] as const,
  detail: (id: string) => [...crawlSourceKeys.details(), id] as const,
};

export function useCrawlSources(filters: CrawlSourceFilters = {}) {
  const defaultFilters = {
    page: 1,
    limit: 10,
    ...filters,
  };

  return useQuery({
    queryKey: crawlSourceKeys.list(defaultFilters),
    queryFn: async () => {
      const response = await getCrawlSources(defaultFilters);
      return (
        response?.data || {
          crawlSources: [],
          pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
        }
      );
    },
  });
}

export function useCrawlSource(id: string) {
  return useQuery({
    queryKey: crawlSourceKeys.detail(id),
    queryFn: async () => {
      const response = await getCrawlSourceById(id);
      return response?.data || null;
    },
    enabled: !!id,
  });
}

export function useCreateCrawlSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCrawlSourceData) => createCrawlSource(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: crawlSourceKeys.lists() });
    },
  });
}

export function useUpdateCrawlSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateCrawlSourceData>;
    }) => updateCrawlSource(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: crawlSourceKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: crawlSourceKeys.detail(variables.id),
      });
    },
  });
}

export function useDeleteCrawlSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCrawlSource(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: crawlSourceKeys.lists() });
    },
  });
}

export function useTriggerCrawl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => triggerCrawl(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: crawlSourceKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: crawlSourceKeys.detail(id),
      });
      // Also invalidate opportunities since new ones may have been created
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });
    },
  });
}

