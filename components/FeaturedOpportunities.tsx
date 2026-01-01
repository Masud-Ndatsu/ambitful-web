import { Opportunity } from "@/app/types";
import { OpportunityCard } from "./OpportunityCard";
import { opportunities as data } from "@/app/data";

export const FeaturedOpportunities = () => {
  const opportunities: Opportunity[] = data;
  return (
    <div className="lg:max-w-[158.6rem] lg:p-20  mx-auto">
      <div className="text-center">
        <h1 className="font-degular text-[5rem] font-bold md:text-[6rem]">
          Featured Opportunities
        </h1>
        <p className="text-[2.2rem]">
          Discover life-changing opportunities curated just for you
        </p>
      </div>
      <div className="grid gap-12 grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 mt-12 w-full rounded-[1.45rem]">
        {opportunities.map((opportunity) => {
          return (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          );
        })}
      </div>
    </div>
  );
};
