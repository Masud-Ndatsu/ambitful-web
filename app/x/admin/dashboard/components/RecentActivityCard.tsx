import React from "react";

type Props = {
  title: string;
  icon: React.ReactNode;
  timestamp: string;
};

const RecentActivityCard = ({ icon, title, timestamp }: Props) => {
  return (
    <div className="flex gap-4 mt-12">
      <div className="pt-4">{icon}</div>
      <div>
        <p className="text-[1.4rem]">{title}</p>
        <small className="text-[1.2rem] leading-[1.6rem] text-[#65758B]">
          {timestamp} ago
        </small>
      </div>
    </div>
  );
};

export default RecentActivityCard;
