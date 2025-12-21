import React from "react";

type Props = {
  title: string;
  count: number;
  percentage: number;
  icon: React.ComponentType<any>;
};

const MetricTile = ({ title, count, icon: Icon, percentage }: Props) => {
  return (
    <div className="min-w-[26.8rem] w-full max-w-120 h-[11.3rem] bg-[#FFFFFF] border border-[#E3E3E3] rounded-[0.82rem] flex flex-col justify-between p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[#65758B] text-[1.8rem]">{title}</h3>
        <div className="h-[2.46rem] w-[2.46rem] grid place-items-center rounded-[0.41rem] bg-[#FF75421A]">
          <Icon className="w-[1.14rem] h-[0.8rem]" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-[2.05rem] font-bold font-degular">{count}</h3>
        <small className="text-[#21C45D] text-[0.956rem] leading-[1.366rem]">
          {percentage}
        </small>
      </div>
    </div>
  );
};

export default MetricTile;
