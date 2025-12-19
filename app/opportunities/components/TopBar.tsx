import React from "react";

export const TopBar = () => {
  return (
    <nav
      className="h-[7.9rem] w-full text-background bg-white flex items-center gap-12
     py-[3.2rem] px-10"
    >
      <h2 className="font-bold text-[2rem] leading-[41.12px] font-manrope">
        Opportunities
      </h2>
      <ul className="text-[1.3rem] flex gap-12">
        <li className="py-[0.8rem] px-[1.4rem] border rounded-4xl bg-background text-foreground">
          Recommended{" "}
        </li>
        <li className="py-[0.8rem] px-[1.4rem] flex items-center gap-[5px] border rounded-4xl">
          Saved
          <span className="block h-[1.3rem] w-[1.3rem]  bg-[#0000004D] rounded-full"></span>
        </li>
        <li className="py-[0.8rem] px-[1.4rem] flex items-center gap-[5px] border rounded-4xl">
          Like
          <span className="block h-[1.3rem] w-[1.3rem]  bg-[#0000004D] rounded-full"></span>
        </li>
        <li className="py-[0.8rem] px-[1.4rem] flex items-center gap-[5px] border rounded-4xl">
          Applied
          <span className="block h-[1.3rem] w-[1.3rem]  bg-[#0000004D] rounded-full"></span>
        </li>
        <li className="py-[0.8rem] px-[1.4rem] flex items-center gap-[5px] border rounded-4xl">
          Draft
          <span className="block h-[1.3rem] w-[1.3rem]  bg-[#0000004D] rounded-full"></span>
        </li>
      </ul>
    </nav>
  );
};
