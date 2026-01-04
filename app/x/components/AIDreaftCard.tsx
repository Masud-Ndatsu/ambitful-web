import { Check, Eye, X } from "lucide-react";

type AIDraftStatus = "Pending" | "Approved" | "Rejected" | "Published";

interface AIDraftCardProps {
  title: string;
  source: string;
  date: string;
  status: AIDraftStatus;
  isAIDraft?: boolean;
  opportunityId?: string | null;
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
  onView?: () => void;
}

const STATUS_STYLES: Record<AIDraftStatus, string> = {
  Pending: "text-[#F59F0A] bg-[#F59F0A1A]",
  Approved: "text-[#21C45D] bg-[#03624C]",
  Rejected: "text-[#EF4343] bg-[#EF43431A]",
  Published: "text-[#3B82F6] bg-[#3B82F61A]",
};

export function AIDraftCard({
  title,
  source,
  date,
  status,
  isAIDraft = false,
  opportunityId,
  onApprove,
  onReject,
  onEdit,
  onView,
}: AIDraftCardProps) {
  return (
    <div className="border border-[#E5E7EB] rounded-[0.9rem] p-8 mt-8 flex items-center justify-between">
      {/* Left */}
      <div className="flex-1 pr-4">
        <h4 className="text-[1.4rem] leading-8 break-words">{title}</h4>

        <div className="text-[1.2rem] flex gap-4 mt-2">
          <span className="leading-[1.6rem]">{source}</span>
          <span className="leading-[1.6rem]">{date}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex gap-[1.8rem] items-center">
        {!isAIDraft && (
          <>
            <span
              className={`text-[1.2rem] font-semibold leading-[1.6rem] p-2 rounded-[0.6rem] border border-[#0000000D] ${STATUS_STYLES[status]}`}
            >
              {status}
            </span>
            {status === "Published" && opportunityId && (
              <a
                href={`/x/opportunities/${opportunityId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[1.2rem] font-semibold leading-[1.6rem] py-3 px-[1.3rem] rounded-[0.6rem] border border-[#0000000D] bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors"
              >
                View Opportunity
              </a>
            )}
          </>
        )}

        {onApprove && !isAIDraft && (
          <Check className="text-[#21C45D] h-[1.6rem] w-[1.6rem] cursor-pointer" />
        )}

        {onReject && !isAIDraft && (
          <X className="text-[#EF4343] h-[1.6rem] w-[1.6rem] cursor-pointer" />
        )}

        {isAIDraft && onView && (
          <button
            onClick={onView}
            className={`text-[1.2rem] font-semibold leading-[1.6rem] py-3 px-[1.3rem] rounded-[0.6rem] border border-[#0000000D] bg-[#FFFFFF]! text-[#1A1D23]! flex gap-4`}
          >
            <Eye className="text-[#1A1D23] h-[1.6rem] w-[1.6rem] cursor-pointer" />
            View
          </button>
        )}

        {isAIDraft && onApprove && (
          <button
            onClick={onApprove}
            className={`text-[1.2rem] font-semibold leading-[1.6rem] py-3 px-[1.3rem] rounded-[0.6rem] border border-[#0000000D] text-[#FFFFFF] ${STATUS_STYLES["Approved"]} flex gap-4 hover:opacity-90 transition-opacity`}
            title="Approve and publish as opportunity"
          >
            <Check className="text-[#FFFFFF] h-[1.6rem] w-[1.6rem] cursor-pointer" />
            Approve & Publish
          </button>
        )}

        {isAIDraft && onEdit && (
          <button
            onClick={onEdit}
            className={`text-[1.2rem] font-semibold leading-[1.6rem] py-3 px-[1.3rem] rounded-[0.6rem] border border-[#0000000D] text-[#FFFFFF]! bg-[#1A1D23]! flex gap-4`}
          >
            <Check className="text-[#FFFFFF] h-[1.6rem] w-[1.6rem] cursor-pointer" />
            Edit
          </button>
        )}
        {isAIDraft && onReject && (
          <button
            onClick={onReject}
            className={`text-[1.2rem] font-semibold leading-[1.6rem] py-3 px-[1.3rem] rounded-[0.6rem] border border-[#0000000D] bg-[#FFFFFF]! text-[#1A1D23]! flex gap-4 hover:bg-gray-50 transition-colors`}
          >
            <X className="text-[#1A1D23] h-[1.6rem] w-[1.6rem] cursor-pointer" />
            Reject
          </button>
        )}
      </div>
    </div>
  );
}
