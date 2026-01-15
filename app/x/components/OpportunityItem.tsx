import { Button } from "@/components/ui/button";
import { Bookmark, Heart } from "lucide-react";
import React, { useCallback } from "react";
import { useSaveJob, useApplyToOpportunity } from "@/hooks/useOpportunities";
import { OpportunityCategory } from "@/types/opportunity";
import { useRouter } from "next/navigation";

// Define props interface with required and optional fields
interface OpportunityItemProps {
  id?: string;
  title: string;
  company: string;
  time: string;
  details: string[];
  categories: OpportunityCategory[];
  salary?: string;
  matchScore?: number;
}

// Default match score
const DEFAULT_MATCH_SCORE = 90;

export default function OpportunityItem({
  id,
  title,
  company,
  time,
  details,
  categories,
  matchScore = DEFAULT_MATCH_SCORE,
}: OpportunityItemProps) {
  const router = useRouter();
  const saveJobMutation = useSaveJob();
  const applyMutation = useApplyToOpportunity();

  // Extract the first category name or default to "General"
  const category = categories[0]?.opportunityType?.name ?? "General";

  // Event handlers
  const handleSaveJob = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!id) return;
      saveJobMutation.mutate(id);
    },
    [id, saveJobMutation]
  );

  const handleApply = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!id) return;
      applyMutation.mutate({ opportunityId: id });
    },
    [id, applyMutation]
  );

  const handleAskAi = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleViewDetails = useCallback(() => {
    if (!id) return;
    router.push(`/x/opportunities/${id}`);
  }, [id, router]);

  return (
    <div
      className="bg-white rounded-2xl p-8 border border-[#E3E3E3] relative flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleViewDetails}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between gap-6 mb-6">
        {/* Logo and Info */}
        <div className="flex gap-6 flex-1 min-w-0">
          <div className="h-[4.8rem] w-[4.8rem] grid place-items-center bg-[#FF6B35] text-white rounded-2xl shrink-0 font-bold text-[1.8rem]">
            {company.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[#1A1D23] text-[1rem]">{time}</span>
            <h2 className="text-[1.6rem] font-semibold text-[#1A1D23] truncate">
              {company}
            </h2>
          </div>
        </div>

        {/* Category Button */}
        <button className="border py-[0.4rem] px-4 text-[1rem] bg-[#FF6B35] text-white rounded-2xl font-semibold leading-[1.994rem] mb-8">
          {category}
        </button>

        {/* Match Score Badge */}
        <div className="flex flex-col items-center shrink-0">
          <div className="h-[4.4rem] w-[4.4rem] rounded-full bg-[#03624C] text-white grid place-items-center text-[1.2rem] font-bold">
            {matchScore}%
          </div>
          <span className="text-[1rem] text-[#505662] mt-2">Match</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[1.4rem] font-semibold text-[#1A1D23] mb-4 line-clamp-2">
        {title}
      </h3>

      {/* Details Tags */}
      <div className="flex items-center gap-3 flex-wrap mb-8">
        {details.map((detail, index) => (
          <span
            key={index}
            className="text-[1.1rem] text-[#1A1D23] bg-[#F6F8FB] px-4 py-2 rounded-lg border border-[#E3E3E3]"
          >
            {detail}
          </span>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t border-[#E3E3E3]">
        {/* Action Icons */}
        <div className="flex gap-3">
          <button
            onClick={handleSaveJob}
            disabled={saveJobMutation.isPending}
            className="h-[3.2rem] w-[3.2rem] bg-[#F6F8FB] hover:bg-[#E3E3E3] text-[#505662] grid place-items-center rounded-2xl border border-[#E3E3E3] transition-colors disabled:opacity-50"
          >
            <Bookmark className="w-[1.6rem] h-[1.6rem]" />
          </button>
          <button className="h-[3.2rem] w-[3.2rem] bg-[#F6F8FB] hover:bg-[#E3E3E3] text-[#505662] grid place-items-center rounded-2xl border border-[#E3E3E3] transition-colors">
            <Heart className="w-[1.6rem] h-[1.6rem]" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handleAskAi}
            className="bg-white hover:bg-[#E3E3E3] text-[#505662] rounded-2xl px-8 py-3 text-[1.4rem] font-medium h-[3.2rem] disabled:opacity-50"
          >
            Ask AI
          </Button>
          <Button
            onClick={handleApply}
            disabled={applyMutation.isPending}
            className="bg-[#03624C] hover:bg-[#03624C]/90 text-white rounded-2xl px-8 py-3 text-[1.4rem] font-medium h-[3.2rem] disabled:opacity-50"
          >
            {applyMutation.isPending ? "Applying..." : "Apply Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
