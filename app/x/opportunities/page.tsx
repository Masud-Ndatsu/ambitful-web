"use client";
import React, { useState } from "react";
import { TopBar } from "../components/TopBar";
import OpportunityListing from "../components/OpportunityListing";
import AgentComponent from "../components/AgentComponent";
import { useAuth } from "@/hooks/useAuthentication";
import { useSearchParams } from "next/navigation";

export default function OpportunitiesPage() {
  const { user, isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("recommended");
  const search = searchParams.get("tab") || "recommended";

  console.log({ search });

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <TopBar
        isAuth={isAuthenticated}
        user={user}
        onFilterChange={handleFilterChange}
        activeFilter={activeFilter}
      />

      <section className="flex-1 flex overflow-hidden">
        <OpportunityListing activeFilter={search} />
        <AgentComponent user={user} />
      </section>
    </div>
  );
}
