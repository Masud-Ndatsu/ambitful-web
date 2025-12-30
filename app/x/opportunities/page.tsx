"use client";
import React from "react";
import { TopBar } from "../components/TopBar";
import OpportunityListing from "../components/OpportunityListing";
import { useAuth } from "@/hooks/useAuthentication";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  console.log({ user });
  return (
    <main>
      <TopBar isAuth={isAuthenticated} user={user} />
      <section className="min-h-[calc(100vh-8rem)] bg-[#F6F8FB] flex">
        <OpportunityListing />
        {/* <AgentComponent user={user} /> */}
      </section>{" "}
    </main>
  );
}
