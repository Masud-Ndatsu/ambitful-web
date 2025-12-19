import React from "react";
import OpportunityListing from "./OpportunityListing";
import AgentComponent from "./AgentComponent";
import { TopBar } from "./TopBar";

export default async function UserDashboard() {
  return (
    <div>
      <TopBar />
      <section className="min-h-[calc(100vh-8rem)] bg-[#F6F8FB] flex">
        <OpportunityListing />
        <AgentComponent />
      </section>
    </div>
  );
}
