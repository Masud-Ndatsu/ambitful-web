import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAIDrafts, reviewAIDraft, updateAIDraft, getAIDraftById, crawlAIDraftDetails, bulkCrawlAIDraftDetails, AIDraft, CreateAIDraftData } from '@/actions/ai-drafts';

export const useAIDrafts = (status?: 'PENDING' | 'CRAWLING' | 'CRAWLED' | 'APPROVED' | 'REJECTED' | 'PUBLISHED', limit?: number) => {
  return useQuery({
    queryKey: ['aiDrafts', status, limit],
    queryFn: () => getAIDrafts({ status, limit }),
  });
};

export const usePendingAIDrafts = (limit = 3) => {
  return useQuery({
    queryKey: ['aiDrafts', 'PENDING', limit],
    queryFn: () => getAIDrafts({ status: 'PENDING', limit }),
  });
};

export const useReviewedAIDrafts = () => {
  return useQuery({
    queryKey: ['aiDrafts', 'reviewed'],
    queryFn: () => getAIDrafts({}),
    select: (data) => {
      if (data?.success && data?.data) {
        return {
          ...data,
          data: {
            ...data.data,
            drafts: data.data.drafts.filter((draft: AIDraft) => !['PENDING', 'CRAWLING', 'CRAWLED'].includes(draft.status))
          }
        };
      }
      return data;
    },
  });
};

export const useReviewAIDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { status: 'APPROVED' | 'REJECTED'; rejectionReason?: string } }) =>
      reviewAIDraft(id, data),
    onSuccess: () => {
      // Invalidate and refetch AI drafts queries
      queryClient.invalidateQueries({ queryKey: ['aiDrafts'] });
    },
  });
};

export const useAIDraftById = (id: string) => {
  return useQuery({
    queryKey: ['ai-draft', id],
    queryFn: () => getAIDraftById(id),
    enabled: !!id,
  });
};

export const useUpdateAIDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateAIDraftData> }) =>
      updateAIDraft(id, data),
    onSuccess: () => {
      // Invalidate and refetch AI drafts queries
      queryClient.invalidateQueries({ queryKey: ['ai-drafts'] });
      queryClient.invalidateQueries({ queryKey: ['ai-draft'] });
    },
  });
};

export const useCrawlAIDraftDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, engine }: { id: string; engine?: "SCRAPER_DO" | "CHEERIO" | "PLAYWRIGHT" }) =>
      crawlAIDraftDetails(id, engine),
    onSuccess: (_, { id }) => {
      // Invalidate and refetch the specific AI draft and list
      queryClient.invalidateQueries({ queryKey: ['ai-draft', id] });
      queryClient.invalidateQueries({ queryKey: ['ai-drafts'] });
    },
  });
};

export const useBulkCrawlAIDraftDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ draftIds, engine }: { draftIds: string[]; engine?: "SCRAPER_DO" | "CHEERIO" | "PLAYWRIGHT" }) =>
      bulkCrawlAIDraftDetails(draftIds, engine),
    onSuccess: () => {
      // Invalidate and refetch AI drafts list
      queryClient.invalidateQueries({ queryKey: ['aiDrafts'] });
      queryClient.invalidateQueries({ queryKey: ['ai-draft'] });
    },
  });
};