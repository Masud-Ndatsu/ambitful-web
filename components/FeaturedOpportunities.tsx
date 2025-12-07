import { Opportunity } from "@/app/types";
import { OpportunityCard } from "./OpportunityCard";
import { opportunities as data } from "@/app/data";

export const FeaturedOpportunities = () => {
  const opportunities: Opportunity[] = data;
  return (
    <div>
      <div className="text-center">
        <h1 className="font-degular font-bold text-[60px]">
          Featured Opportunities
        </h1>
        <p className="text-[22px]">
          Discover life-changing opportunities curated just for you
        </p>
      </div>
      <div className="grid gap-[30px] grid-cols-1 lg:grid-cols-3 mt-[45px] rounded-[14.5px]">
        {opportunities.map((opportunity) => {
          return (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          );
        })}
      </div>
    </div>
  );
};
