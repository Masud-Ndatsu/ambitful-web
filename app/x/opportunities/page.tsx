"use client";
import React, { useState } from "react";
import { TopBar } from "../components/TopBar";
import OpportunityListing from "../components/OpportunityListing";
import AgentComponent from "../components/AgentComponent";
import { useAuth } from "@/hooks/useAuthentication";

export default function OpportunitiesPage() {
  const { user, isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState("recommended");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* TopBar with title and tabs */}
      <TopBar 
        isAuth={isAuthenticated} 
        user={user} 
        onFilterChange={handleFilterChange}
        activeFilter={activeFilter}
      />

      {/* Main Content Area */}
      <section className="flex-1 flex overflow-hidden">
        {/* Opportunity Listing Panel */}
        <OpportunityListing activeFilter={activeFilter} />

        {/* AI Agent Panel */}
        <AgentComponent user={user} />
      </section>
    </div>
  );
}
