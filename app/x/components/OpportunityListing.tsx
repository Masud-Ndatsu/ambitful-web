import React from "react";
import OpportunityItem from "./OpportunityItem";
import { useOpportunities } from "@/hooks/useOpportunities";

export default function OpportunityListing() {
  const { data: opportunitiesData, isLoading, error } = useOpportunities();
  const opportunities = opportunitiesData?.opportunities || [];

  if (isLoading) {
    return (
      <article className="flex-2 p-8 max-h-screen overflow-y-scroll scroll-smooth">
        <div className="flex items-center justify-center h-full">
          <div className="text-[1.4rem] text-[#505662]">
            Loading opportunities...
          </div>
        </div>
      </article>
    );
  }

  if (error) {
    return (
      <article className="flex-2 p-8 max-h-screen overflow-y-scroll scroll-smooth">
        <div className="flex items-center justify-center h-full">
          <div className="text-[1.4rem] text-red-500">
            Failed to load opportunities
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex-2 p-8 max-h-screen overflow-y-scroll scroll-smooth">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {opportunities.length > 0 ? (
          opportunities.map((opportunity) => {
            return (
              <OpportunityItem
                key={opportunity.id}
                id={opportunity.id}
                title={opportunity.title}
                company={opportunity.organization}
                location={opportunity.locations.join(", ") || "Remote"}
                time={new Date(opportunity.createdAt).toLocaleDateString()}
                description={opportunity.description}
                categories={opportunity.opportunityCategories}
                details={[
                  opportunity.locations.join(", ") || "Remote",
                  opportunity.isRemote ? "Remote" : "Onsite",
                  opportunity.compensation || "Competitive",
                ]}
                salary={opportunity.compensation}
              />
            );
          })
        ) : (
          <div className="col-span-full flex items-center justify-center h-64">
            <div className="text-[1.4rem] text-[#505662]">
              No opportunities found
            </div>
          </div>
        )}
      </ul>
    </article>
  );
}
