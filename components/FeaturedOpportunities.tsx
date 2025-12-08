import { Opportunity } from "@/app/types";
import { OpportunityCard } from "./OpportunityCard";
import { opportunities as data } from "@/app/data";

export const FeaturedOpportunities = () => {
  const opportunities: Opportunity[] = data;
  return (
    <div>
      <div className="text-center">
        <h1 className="font-degular font-bold text-[6rem]">
          Featured Opportunities
        </h1>
        <p className="text-[2.2rem]">
          Discover life-changing opportunities curated just for you
        </p>
      </div>
      <div className="grid gap-[3rem] grid-cols-1 lg:grid-cols-3 mt-[4.5rem] rounded-[1.45rem]">
        {opportunities.map((opportunity) => {
          return (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          );
        })}
      </div>
    </div>
  );
};
