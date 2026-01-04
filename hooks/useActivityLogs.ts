import { useQuery } from '@tanstack/react-query';
import { getRecentActivities, getUserActivities } from '@/actions/activity-logs';

export const useRecentActivities = (limit = 10) => {
  return useQuery({
    queryKey: ['activity-logs', 'recent', limit],
    queryFn: () => getRecentActivities({ limit }),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useUserActivities = (userId: string, limit = 10) => {
  return useQuery({
    queryKey: ['activity-logs', 'user', userId, limit],
    queryFn: () => getUserActivities(userId, { limit }),
    enabled: !!userId,
  });
};

