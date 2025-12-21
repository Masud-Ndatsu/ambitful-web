import { Check, X } from "lucide-react";

type AIDraftStatus = "Pending" | "Approved" | "Rejected";

interface AIDraftCardProps {
  title: string;
  source: string;
  date: string;
  status: AIDraftStatus;
  onApprove?: () => void;
  onReject?: () => void;
}

const STATUS_STYLES: Record<AIDraftStatus, string> = {
  Pending: "text-[#F59F0A] bg-[#F59F0A1A]",
  Approved: "text-[#21C45D] bg-[#21C45D1A]",
  Rejected: "text-[#EF4343] bg-[#EF43431A]",
};

export function AIDraftCard({
  title,
  source,
  date,
  status,
  onApprove,
  onReject,
}: AIDraftCardProps) {
  return (
    <div className="border border-[#E5E7EB] rounded-[0.9rem] p-8 mt-8 flex items-center justify-between">
      {/* Left */}
      <div>
        <h4 className="text-[1.4rem] leading-8">{title}</h4>

        <div className="text-[1.2rem] flex gap-4 mt-2">
          <span className="leading-[1.6rem]">{source}</span>
          <span className="leading-[1.6rem]">{date}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex gap-[1.8rem] items-center">
        <span
          className={`text-[1.2rem] font-semibold leading-[1.6rem] p-2 rounded-[0.6rem] border border-[#0000000D] ${STATUS_STYLES[status]}`}
        >
          {status}
        </span>

        {onApprove && (
          <Check className="text-[#21C45D] h-[1.6rem] w-[1.6rem] cursor-pointer" />
        )}

        {onReject && (
          <X className="text-[#EF4343] h-[1.6rem] w-[1.6rem] cursor-pointer" />
        )}
      </div>
    </div>
  );
}
