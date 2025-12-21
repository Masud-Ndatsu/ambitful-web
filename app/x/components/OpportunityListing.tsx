import React from "react";
import OpportunityItem from "./OpportunityItem";
import { User } from "@/actions/auth";

interface OpportunityListingProps {
  user: User | null;
}

export default function OpportunityListing({}: OpportunityListingProps) {
  return (
    <article className="flex-2 p-8 max-h-screen overflow-y-scroll scroll-smooth">
      <ul className="flex flex-col gap-8">
        <OpportunityItem
          title="UX Designer - Design Systems"
          time="1 hour"
          description="Twitch / Gaming · Media and Entertainment · Late Stage"
          details={[
            "San Francisco, CA",
            "Onsite",
            "Full-time",
            "$108k/yr - $164k/yr",
          ]}
          salary="$108k/yr - $164k/yr"
        />
        <OpportunityItem
          title="UX Designer - Design Systems"
          time="1 hour"
          description="Twitch / Gaming · Media and Entertainment · Late Stage"
          details={[
            "San Francisco, CA",
            "Onsite",
            "Full-time",
            "$108k/yr - $164k/yr",
          ]}
          salary="$108k/yr - $164k/yr"
        />
        <OpportunityItem
          title="UX Designer - Design Systems"
          time="1 hour"
          description="Twitch / Gaming · Media and Entertainment · Late Stage"
          details={[
            "San Francisco, CA",
            "Onsite",
            "Full-time",
            "$108k/yr - $164k/yr",
          ]}
          salary="$108k/yr - $164k/yr"
        />
        <OpportunityItem
          title="UX Designer - Design Systems"
          time="1 hour"
          description="Twitch / Gaming · Media and Entertainment · Late Stage"
          details={[
            "San Francisco, CA",
            "Onsite",
            "Full-time",
            "$108k/yr - $164k/yr",
          ]}
          salary="$108k/yr - $164k/yr"
        />
        <OpportunityItem
          title="UX Designer - Design Systems"
          time="1 hour"
          description="Twitch / Gaming · Media and Entertainment · Late Stage"
          details={[
            "San Francisco, CA",
            "Onsite",
            "Full-time",
            "$108k/yr - $164k/yr",
          ]}
          salary="$108k/yr - $164k/yr"
        />
        <OpportunityItem
          title="UX Designer - Design Systems"
          time="1 hour"
          description="Twitch / Gaming · Media and Entertainment · Late Stage"
          details={[
            "San Francisco, CA",
            "Onsite",
            "Full-time",
            "$108k/yr - $164k/yr",
          ]}
          salary="$108k/yr - $164k/yr"
        />
        <OpportunityItem
          title="UX Designer - Design Systems"
          time="1 hour"
          description="Twitch / Gaming · Media and Entertainment · Late Stage"
          details={[
            "San Francisco, CA",
            "Onsite",
            "Full-time",
            "$108k/yr - $164k/yr",
          ]}
          salary="$108k/yr - $164k/yr"
        />
        <OpportunityItem
          title="UX Designer - Design Systems"
          time="1 hour"
          description="Twitch / Gaming · Media and Entertainment · Late Stage"
          details={[
            "San Francisco, CA",
            "Onsite",
            "Full-time",
            "$108k/yr - $164k/yr",
          ]}
          salary="$108k/yr - $164k/yr"
        />
        <OpportunityItem
          title="UX Designer - Design Systems"
          time="1 hour"
          description="Twitch / Gaming · Media and Entertainment · Late Stage"
          details={[
            "San Francisco, CA",
            "Onsite",
            "Full-time",
            "$108k/yr - $164k/yr",
          ]}
          salary="$108k/yr - $164k/yr"
        />
        <OpportunityItem
          title="UX Designer - Design Systems"
          time="1 hour"
          description="Twitch / Gaming · Media and Entertainment · Late Stage"
          details={[
            "San Francisco, CA",
            "Onsite",
            "Full-time",
            "$108k/yr - $164k/yr",
          ]}
          salary="$108k/yr - $164k/yr"
        />
      </ul>
    </article>
  );
}
