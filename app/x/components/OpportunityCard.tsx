import { Button } from "@/components/ui/button";
import { Bookmark, Heart, House } from "lucide-react";
import React from "react";

interface OpportunityCardProps {
  title: string;
  time: string;
  description: string;
  details: string[];
  salary?: string;
  matchScore?: number;
}

export default function OpportunityCard({
  title,
  time,
  description,
  details,
  matchScore = 90,
}: OpportunityCardProps) {
  return (
    <li className="min-w-[816px] bg-foreground text-background rounded-4xl flex">
      <div className="flex-4">
        <div className="p-8 w-full flex gap-8">
          <div className="h-32 w-32 grid place-items-center bg-[#03624C] text-foreground rounded-[1.6rem]">
            <House className="h-[2.56rem] w-[2.56rem]" />
          </div>
          <div className="">
            <header className="flex items-center gap-4 leading-[4.112rem]">
              <h1>{title}</h1>
              <span className="font-manrope text-[1.6rem] text-[#00000080]">
                {time}
              </span>
            </header>
            <div>
              <p className="leading-[4.112rem] text-[1.6rem] text-[#00000080]">
                {description}
              </p>
              <ul className="flex items-center gap-2 text-[1.4rem] mt-8">
                {details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <footer className="flex items-center justify-between gap-8 mt-12">
              <div className="flex gap-4">
                <span className="h-14 w-14 bg-[#03624C0D] text-[#00000080] grid place-items-center rounded-2xl">
                  <Bookmark className="w-[1.33rem] h-[1.465rem]" />
                </span>
                <span className="h-14 w-14 bg-[#03624C0D] text-[#00000080] grid place-items-center rounded-2xl">
                  <Heart className="w-[1.33rem] h-[1.465rem]" />
                </span>
              </div>
              <div className="flex gap-6">
                <Button className="bg-[#03624C]! rounded-4xl!">
                  Apply Now
                </Button>
                <Button className="bg-[#FFFFFF]! rounded-4xl! text-background! border border-[#E2E2E2]">
                  Ask Ai
                </Button>
              </div>
            </footer>
          </div>
        </div>
      </div>
      <div className="bg-[#03624C] text-foreground flex-1 w-full rounded-r-4xl py-8 text-center">
        <div className="h-[90px] w-[90px] rounded-full bg-white text-[#03624C] mx-auto grid place-items-center text-[2.5rem] font-semibold">
          {matchScore}%
        </div>
        <h2 className="my-4">Match Score</h2>
        <hr className="w-[18rem] mx-auto border-[#FFFFFF4D]" />
      </div>
    </li>
  );
}
