import { Progress } from "@/components/ui/progress";
import React from "react";

type Props = {
  name: string;
  total: number;
  percentage: number;
};

const RegionProgress = ({ name, total, percentage }: Props) => {
  return (
    <div className="text-[1.024rem] font-manrope font-medium tracking-[-3%] flex flex-col gap-4 mt-8">
      <div className="flex justify-between">
        <h4>{name}</h4>
        <span>{total}</span>
      </div>
      <Progress className="h-[0.8rem] bg-[#EDF1EE]" value={percentage} />
    </div>
  );
};

export default RegionProgress;
