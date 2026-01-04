"use client";
import React, { useState, useMemo } from "react";
import OpportunityItem from "./OpportunityItem";
import OpportunityFilter, { FilterOptions } from "./OpportunityFilter";
import {
  useOpportunities,
  useRecommendations,
  useSavedJobs,
  useLikedJobs,
} from "@/hooks/useOpportunities";
import { useAuth } from "@/hooks/useAuthentication";
import { OpportunityFilters, SavedJob, LikedJob } from "@/types/opportunity";

interface OpportunityListingProps {
  activeFilter?: string;
}

export default function OpportunityListing({
  activeFilter = "recommended",
}: OpportunityListingProps) {
  const { isAuthenticated } = useAuth();

  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    selectedTypes: [],
  });

  // Convert filter state to API filters
  const apiFilters: OpportunityFilters = useMemo(
    () => ({
      limit: 50, // Get more results when filtering
      ...(filters.selectedTypes.length > 0 && {
        opportunityTypeIds: filters.selectedTypes.join(","),
      }),
    }),
    [filters]
  );

  // Fetch data with filters
  const {
    data: opportunitiesData,
    isLoading,
    error,
  } = useOpportunities(apiFilters);
  const { data: recommendationsData, isLoading: isLoadingRecommendations } =
    useRecommendations(10, isAuthenticated);
  const { data: savedJobsResponse } = useSavedJobs();
  const { data: likedJobsResponse } = useLikedJobs();

  console.log({ opportunitiesData });

  // Determine which data to display based on activeFilter
  const displayOpportunities = useMemo(() => {
    const opportunities = opportunitiesData?.opportunities || [];
    const recommendations = recommendationsData?.recommendations || [];
    const savedJobsData =
      savedJobsResponse?.savedJobs?.map((save: SavedJob) => save.opportunity) ||
      [];
    const likedJobsData =
      likedJobsResponse?.likedJobs?.map((like: LikedJob) => like.opportunity) ||
      [];

    // If filters are applied, always show filtered results
    if (filters.selectedTypes.length > 0) {
      return opportunities;
    }

    // Otherwise, show data based on activeFilter
    switch (activeFilter) {
      case "saved":
        return savedJobsData;
      case "like":
        return likedJobsData;
      case "applied":
        return [];
      case "draft":
        return []; // TODO: Implement draft opportunities
      case "recommended":
      default:
        return recommendations.length > 0 ? recommendations : opportunities;
    }
  }, [
    activeFilter,
    filters.selectedTypes.length,
    opportunitiesData,
    recommendationsData,
    savedJobsResponse,
    likedJobsResponse,
  ]);

  // Filter handlers
  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleClearAll = () => {
    setFilters({ selectedTypes: [] });
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const created = new Date(date);
    const diffMs = now.getTime() - created.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return "Just now";
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  if (error) {
    return (
      <article className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-center h-full">
          <div className="text-[1.4rem] text-red-500">
            Failed to load opportunities
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex-2 p-6 overflow-y-auto space-y-6">
      {/* Filter Component */}
      <OpportunityFilter
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearAll={handleClearAll}
      />

      {/* Opportunity Items List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading || isLoadingRecommendations ? (
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 border border-[#E3E3E3] animate-pulse h-[400px]"
            >
              <div className="flex items-start justify-between gap-6 mb-6">
                <div className="flex gap-6 flex-1">
                  <div className="h-12 w-12 bg-gray-200 rounded-2xl" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-11 w-11 bg-gray-200 rounded-full" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="space-y-2 mb-6">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
                <div className="h-3 bg-gray-200 rounded w-4/6" />
              </div>
              <div className="flex gap-2 mb-8">
                <div className="h-8 bg-gray-200 rounded w-16" />
                <div className="h-8 bg-gray-200 rounded w-20" />
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-gray-200 rounded" />
                  <div className="h-8 w-8 bg-gray-200 rounded" />
                </div>
                <div className="h-8 bg-gray-200 rounded w-24" />
              </div>
            </div>
          ))
        ) : displayOpportunities.length > 0 ? (
          displayOpportunities.map((opportunity: any) => (
            <OpportunityItem
              key={opportunity.id}
              id={opportunity.id}
              title={opportunity.title}
              company={opportunity.organization}
              location={opportunity.locations?.join(", ") || "Remote"}
              time={getTimeAgo(opportunity.createdAt)}
              description={
                opportunity.description || "No description available"
              }
              details={[
                opportunity.isRemote ? "Remote" : "Onsite",
                ...(opportunity.locations?.slice(0, 2) || []),
              ]}
              categories={opportunity.opportunityCategories || []}
              salary={opportunity.compensation}
              matchScore={opportunity.matchScore || 90}
            />
          ))
        ) : (
          <div className="col-span-full bg-white rounded-2xl p-12 border border-[#E3E3E3] text-center">
            <div className="text-[1.4rem] text-[#505662]">
              No opportunities found
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
