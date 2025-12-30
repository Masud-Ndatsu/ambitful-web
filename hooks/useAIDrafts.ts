import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAIDrafts, reviewAIDraft, AIDraft } from '@/actions/ai-drafts';

export const useAIDrafts = (status?: 'PENDING' | 'APPROVED' | 'REJECTED', limit?: number) => {
  return useQuery({
    queryKey: ['ai-drafts', status, limit],
    queryFn: () => getAIDrafts({ status, limit }),
  });
};

export const usePendingAIDrafts = (limit = 3) => {
  return useQuery({
    queryKey: ['ai-drafts', 'PENDING', limit],
    queryFn: () => getAIDrafts({ status: 'PENDING', limit }),
  });
};

export const useReviewedAIDrafts = () => {
  return useQuery({
    queryKey: ['ai-drafts', 'reviewed'],
    queryFn: () => getAIDrafts({}),
    select: (data) => {
      if (data?.success && data?.data) {
        return {
          ...data,
          data: {
            ...data.data,
            drafts: data.data.drafts.filter((draft: AIDraft) => draft.status !== 'PENDING')
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
      queryClient.invalidateQueries({ queryKey: ['ai-drafts'] });
    },
  });
};