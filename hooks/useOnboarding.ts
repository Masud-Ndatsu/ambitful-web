import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  submitOnboarding,
  getOnboardingStatus,
  OnboardingData,
} from "@/actions/onboarding";

export const onboardingKeys = {
  all: ["onboarding"] as const,
  status: () => [...onboardingKeys.all, "status"] as const,
};

export function useOnboardingStatus() {
  return useQuery({
    queryKey: onboardingKeys.status(),
    queryFn: async () => {
      const response = await getOnboardingStatus();
      return response?.data || null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSubmitOnboarding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OnboardingData) => submitOnboarding(data),
    onSuccess: (response) => {
      if (response.success) {
        // Invalidate status and user data to refetch
        queryClient.invalidateQueries({ queryKey: onboardingKeys.status() });
        // Also invalidate auth user data since onboarding status changed
        queryClient.invalidateQueries({ queryKey: ["auth", "user", "current"] });
      }
    },
    onError: (error) => {
      console.error("Error submitting onboarding:", error);
    },
  });
}