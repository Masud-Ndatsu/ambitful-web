import { useQuery } from "@tanstack/react-query";
import { getOpportunityTypes } from "@/actions/opportunity-types";

export const opportunityTypeKeys = {
  all: ["opportunityTypes"] as const,
  lists: () => [...opportunityTypeKeys.all, "list"] as const,
};

export function useOpportunityTypes() {
  return useQuery({
    queryKey: opportunityTypeKeys.lists(),
    queryFn: async () => {
      const response = await getOpportunityTypes();
      return response?.data || [];
    },
    staleTime: 10 * 60 * 1000,
  });
}
