"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CrawlJob } from "@/actions/crawl-jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, XCircle, RotateCw, Eye } from "lucide-react";

const getStatusBadge = (status: CrawlJob["status"]) => {
  const statusConfig = {
    QUEUED: { variant: "secondary" as const, label: "Queued" },
    ACTIVE: { variant: "default" as const, label: "Active" },
    COMPLETED: { variant: "success" as const, label: "Completed" },
    FAILED: { variant: "destructive" as const, label: "Failed" },
    CANCELLED: { variant: "outline" as const, label: "Cancelled" },
    RETRYING: { variant: "warning" as const, label: "Retrying" },
  };

  const config = statusConfig[status] || statusConfig.QUEUED;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const formatDuration = (duration: number | null) => {
  if (!duration) return "N/A";
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

const formatDate = (date: string | null) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString();
};

// Actions cell component
const ActionsCell = ({ job, meta }: { job: CrawlJob; meta: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="px-4 py-2 text-[1.2rem] font-semibold text-gray-700">
              Actions
            </div>
            <button
              onClick={() => {
                meta?.onViewDetails?.(job.id);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-[1.4rem] hover:bg-gray-100 transition-colors flex items-center"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </button>
            <div className="my-1 border-t border-gray-200" />
            {(job.status === "QUEUED" || job.status === "ACTIVE") && (
              <button
                onClick={() => {
                  meta?.onCancel?.(job.id);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-[1.4rem] hover:bg-gray-100 transition-colors text-red-600 flex items-center"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel Job
              </button>
            )}
            {job.status === "FAILED" && (
              <button
                onClick={() => {
                  meta?.onRetry?.(job.id);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-[1.4rem] hover:bg-gray-100 transition-colors flex items-center"
              >
                <RotateCw className="mr-2 h-4 w-4" />
                Retry Job
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export const crawlJobColumns: ColumnDef<CrawlJob>[] = [
  {
    accessorKey: "id",
    header: "Job ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <div className="font-mono text-[1.2rem] text-gray-600">
          {id.substring(0, 8)}...
        </div>
      );
    },
  },
  {
    accessorKey: "crawlSource",
    header: "Source",
    cell: ({ row }) => {
      const source = row.original.crawlSource;
      return (
        <div className="max-w-[200px]">
          <div className="font-medium text-[1.4rem] truncate">
            {source?.name || "Unknown"}
          </div>
          <div className="text-[1.2rem] text-gray-500 truncate">
            {source?.url || "N/A"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.getValue("status")),
  },
  {
    accessorKey: "queuedAt",
    header: "Queued At",
    cell: ({ row }) => (
      <div className="text-[1.3rem]">
        {formatDate(row.getValue("queuedAt"))}
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <div className="text-[1.3rem]">
        {formatDuration(row.getValue("duration"))}
      </div>
    ),
  },
  {
    accessorKey: "itemsProcessed",
    header: "Processed",
    cell: ({ row }) => (
      <div className="text-center text-[1.3rem]">
        {row.getValue("itemsProcessed")}
      </div>
    ),
  },
  {
    accessorKey: "itemsCreated",
    header: "Created",
    cell: ({ row }) => (
      <div className="text-center text-[1.3rem] text-green-600 font-medium">
        {row.getValue("itemsCreated")}
      </div>
    ),
  },
  {
    accessorKey: "itemsFailed",
    header: "Failed",
    cell: ({ row }) => {
      const failed = row.getValue("itemsFailed") as number;
      return (
        <div
          className={`text-center text-[1.3rem] font-medium ${
            failed > 0 ? "text-red-600" : "text-gray-400"
          }`}
        >
          {failed}
        </div>
      );
    },
  },
  {
    accessorKey: "retryCount",
    header: "Retries",
    cell: ({ row }) => {
      const retryCount = row.getValue("retryCount") as number;
      const maxRetries = row.original.maxRetries;
      return (
        <div className="text-center text-[1.3rem]">
          {retryCount}/{maxRetries}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const job = row.original;
      const meta = table.options.meta as any;
      return <ActionsCell job={job} meta={meta} />;
    },
  },
];
