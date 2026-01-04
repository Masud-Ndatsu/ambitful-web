import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCrawlJobs,
  getCrawlJobById,
  getCrawlJobStats,
  getQueueMetrics,
  cancelCrawlJob,
  retryCrawlJob,
  cleanupOldJobs,
  CrawlJobFilters,
} from "@/actions/crawl-jobs";
import { useToast } from "./use-toast";

// Get all crawl jobs
export function useCrawlJobs(filters: CrawlJobFilters = {}) {
  return useQuery({
    queryKey: ["crawl-jobs", filters],
    queryFn: async () => {
      const response = await getCrawlJobs(filters);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch crawl jobs");
      }
      return response.data;
    },
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });
}

// Get crawl job by ID
export function useCrawlJob(id: string) {
  return useQuery({
    queryKey: ["crawl-job", id],
    queryFn: async () => {
      const response = await getCrawlJobById(id);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch crawl job");
      }
      return response.data;
    },
    enabled: !!id,
    refetchInterval: 3000, // Refetch every 3 seconds for active job monitoring
  });
}

// Get crawl job stats
export function useCrawlJobStats() {
  return useQuery({
    queryKey: ["crawl-job-stats"],
    queryFn: async () => {
      const response = await getCrawlJobStats();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch crawl job stats");
      }
      return response.data;
    },
    refetchInterval: 10000, // Refetch every 10 seconds
  });
}

// Get queue metrics
export function useQueueMetrics() {
  return useQuery({
    queryKey: ["queue-metrics"],
    queryFn: async () => {
      const response = await getQueueMetrics();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch queue metrics");
      }
      return response.data;
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });
}

// Cancel crawl job
export function useCancelCrawlJob() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => cancelCrawlJob(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["crawl-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["crawl-job-stats"] });
      queryClient.invalidateQueries({ queryKey: ["queue-metrics"] });
      
      toast({
        title: "Success",
        description: response.data?.message || "Crawl job cancelled successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to cancel crawl job",
        variant: "destructive",
      });
    },
  });
}

// Retry crawl job
export function useRetryCrawlJob() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => retryCrawlJob(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["crawl-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["crawl-job-stats"] });
      queryClient.invalidateQueries({ queryKey: ["queue-metrics"] });
      
      toast({
        title: "Success",
        description: response.data?.message || "Crawl job retried successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to retry crawl job",
        variant: "destructive",
      });
    },
  });
}

// Cleanup old jobs
export function useCleanupOldJobs() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (daysOld: number = 30) => cleanupOldJobs(daysOld),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["crawl-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["crawl-job-stats"] });
      
      toast({
        title: "Success",
        description: `${response.data?.deletedCount || 0} old jobs cleaned up successfully`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to cleanup old jobs",
        variant: "destructive",
      });
    },
  });
}

