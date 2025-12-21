import React from "react";
import OpportunityListing from "./OpportunityListing";
import AgentComponent from "./AgentComponent";
import { TopBar } from "./TopBar";
import { getCurrentUser, User } from "@/actions/auth";

export default async function UserDashboard() {
  const userResponse = await getCurrentUser();
  const isAuth = userResponse?.success || false;
  const user = userResponse?.data as User;

  return (
    <div>
      <TopBar isAuth={isAuth} user={user} />
      <section className="min-h-[calc(100vh-8rem)] bg-[#F6F8FB] flex">
        <OpportunityListing user={user} />
        <AgentComponent user={user} />
      </section>
    </div>
  );
}
