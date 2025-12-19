import { Button } from "@/components/ui/button";
import { Bookmark, Heart, House } from "lucide-react";
import React from "react";

interface OpportunityItemProps {
  title: string;
  time: string;
  description: string;
  details: string[];
  salary?: string;
}

export default function OpportunityItem({
  title,
  time,
  description,
  details,
}: OpportunityItemProps) {
  return (
    <li className="bg-foreground text-background rounded-4xl w-full flex">
      <div className="md:flex-4">
        <div className="p-4 md:p-8 w-full flex gap-4 md:gap-8">
          <div className="h-16 w-16 md:h-32 md:w-32 grid place-items-center bg-[#03624C] text-foreground rounded-[0.8rem] md:rounded-[1.6rem] shrink-0">
            <House className="h-[1.28rem] w-[1.28rem] md:h-[2.56rem] md:w-[2.56rem]" />
          </div>
          <div className="flex-1 min-w-0">
            <header className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 leading-10 md:leading-[4.112rem]">
              <h1 className="text-[1.4rem] md:text-[2rem] font-semibold truncate">
                {title}
              </h1>
              <span className="font-manrope text-[1.2rem] md:text-[1.6rem] text-[#00000080]">
                {time}
              </span>
            </header>
            <div>
              <p className="leading-8 md:leading-[4.112rem] text-[1.2rem] md:text-[1.6rem] text-[#00000080] line-clamp-2 md:line-clamp-none">
                {description}
              </p>
              <ul className="flex items-center gap-1 md:gap-2 text-[1rem] md:text-[1.4rem] mt-3 md:mt-8 flex-wrap">
                {details.map((detail, index) => (
                  <li key={index} className="text-xs md:text-[1.4rem]">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <footer className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 mt-6 md:mt-12">
              <div className="flex gap-3 md:gap-4">
                <span className="h-10 w-10 md:h-14 md:w-14 bg-[#03624C0D] text-[#00000080] grid place-items-center rounded-xl md:rounded-2xl">
                  <Bookmark className="w-4 h-[1.1rem] md:w-[1.33rem] md:h-[1.465rem]" />
                </span>
                <span className="h-10 w-10 md:h-14 md:w-14 bg-[#03624C0D] text-[#00000080] grid place-items-center rounded-xl md:rounded-2xl">
                  <Heart className="w-4 h-[1.1rem] md:w-[1.33rem] md:h-[1.465rem]" />
                </span>
              </div>
              <div className="flex gap-3 md:gap-6">
                <Button className="bg-[#03624C]! rounded-2xl md:rounded-4xl! text-[1.2rem] md:text-[1.6rem] px-4 md:px-6 py-2 md:py-3">
                  Apply Now
                </Button>
                <Button className="bg-[#FFFFFF]! rounded-2xl md:rounded-4xl! text-background! border border-[#E2E2E2] text-[1.2rem] md:text-[1.6rem] px-4 md:px-6 py-2 md:py-3">
                  Ask Ai
                </Button>
              </div>
            </footer>
          </div>
        </div>
      </div>
      <div className="bg-[#03624C] text-foreground md:flex-1 w-full rounded-r-4xl py-4 md:py-8 text-center flex md:block items-center md:items-stretch justify-center md:justify-start flex-col">
        <div className="h-[60px] w-[60px] md:h-[90px] md:w-[90px] rounded-full bg-white text-[#03624C] mx-auto grid place-items-center text-[1.8rem] md:text-[2.5rem] font-semibold">
          90%
        </div>
        <h2 className="my-2 md:my-4 text-[1.2rem] md:text-[2rem]">
          Match Score
        </h2>
        <hr className="w-48 md:w-[18rem] mx-auto border-[#FFFFFF4D]" />
      </div>
    </li>
  );
}
