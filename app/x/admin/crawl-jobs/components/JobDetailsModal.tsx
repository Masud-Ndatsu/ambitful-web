"use client";

import { useCrawlJob } from "@/hooks/useCrawlJobs";
import { Badge } from "@/components/ui/badge";
import { Loader2, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobDetailsModalProps {
  jobId: string;
  onClose: () => void;
}

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { variant: any; label: string }> = {
    QUEUED: { variant: "secondary", label: "Queued" },
    ACTIVE: { variant: "default", label: "Active" },
    COMPLETED: { variant: "success", label: "Completed" },
    FAILED: { variant: "destructive", label: "Failed" },
    CANCELLED: { variant: "outline", label: "Cancelled" },
    RETRYING: { variant: "warning", label: "Retrying" },
  };

  const config = statusConfig[status] || statusConfig.QUEUED;
  return (
    <Badge className="text-[1rem]" variant={config.variant}>
      {config.label}
    </Badge>
  );
};

const formatDate = (date: string | null) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString();
};

const formatDuration = (duration: number | null) => {
  if (!duration) return "N/A";
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

export default function JobDetailsModal({
  jobId,
  onClose,
}: JobDetailsModalProps) {
  const { data: job, isLoading } = useCrawlJob(jobId);

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-8">
        <h2 className="text-[2rem] font-semibold mb-4">Job Not Found</h2>
        <p className="text-gray-600">The requested job could not be found.</p>
        <Button onClick={onClose} className="mt-4 text-[#000000]!">
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[800px] text-[#000000]!">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[2.4rem] font-semibold mb-2">
            Crawl Job Details
          </h2>
          <p className="text-[1.2rem] text-gray-500 font-mono">{job.id}</p>
        </div>
        {getStatusBadge(job.status)}
      </div>

      {/* Source Information */}
      <div className="mb-6">
        <h3 className="text-[1.8rem] font-semibold mb-3">Source Information</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-[1.4rem] text-gray-600">Name:</span>
            <span className="text-[1.4rem] font-medium">
              {job.crawlSource?.name || "Unknown"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[1.4rem] text-gray-600">URL:</span>
            <a
              href={job.crawlSource?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[1.4rem] text-blue-600 hover:underline flex items-center gap-1"
            >
              {job.crawlSource?.url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Job Metrics */}
      <div className="mb-6">
        <h3 className="text-[1.8rem] font-semibold mb-3">Job Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-[1.2rem] text-gray-600 mb-1">Items Processed</p>
            <p className="text-[2rem] font-bold">{job.itemsProcessed}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-[1.2rem] text-gray-600 mb-1">Items Created</p>
            <p className="text-[2rem] font-bold text-green-600">
              {job.itemsCreated}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-[1.2rem] text-gray-600 mb-1">Items Failed</p>
            <p className="text-[2rem] font-bold text-red-600">
              {job.itemsFailed}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-[1.2rem] text-gray-600 mb-1">Retry Count</p>
            <p className="text-[2rem] font-bold text-blue-600">
              {job.retryCount}/{job.maxRetries}
            </p>
          </div>
        </div>
      </div>

      {/* Timing Information */}
      <div className="mb-6">
        <h3 className="text-[1.8rem] font-semibold mb-3">Timing Information</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-[1.4rem] text-gray-600">Queued At:</span>
            <span className="text-[1.4rem]">{formatDate(job.queuedAt)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[1.4rem] text-gray-600">Started At:</span>
            <span className="text-[1.4rem]">{formatDate(job.startedAt)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[1.4rem] text-gray-600">Completed At:</span>
            <span className="text-[1.4rem]">{formatDate(job.completedAt)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[1.4rem] text-gray-600">Duration:</span>
            <span className="text-[1.4rem] font-medium">
              {formatDuration(job.duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Errors */}
      {job.errors && job.errors.length > 0 && (
        <div className="mb-6">
          <h3 className="text-[1.8rem] font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Errors ({job.errors.length})
          </h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {job.errors.map((error) => (
              <div
                key={error.id}
                className="bg-red-50 border border-red-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="destructive" className="text-[1.1rem]">
                    {error.type}
                  </Badge>
                  <span className="text-[1.1rem] text-gray-500">
                    {formatDate(error.createdAt)}
                  </span>
                </div>
                <p className="text-[1.3rem] text-red-800 font-medium mb-2">
                  {error.message}
                </p>
                {error.context && (
                  <details className="text-[1.2rem] text-gray-600">
                    <summary className="cursor-pointer hover:text-gray-800">
                      View Context
                    </summary>
                    <pre className="mt-2 p-2 bg-white rounded text-[1.1rem] overflow-x-auto">
                      {JSON.stringify(error.context, null, 2)}
                    </pre>
                  </details>
                )}
                {error.stackTrace && (
                  <details className="text-[1.2rem] text-gray-600 mt-2">
                    <summary className="cursor-pointer hover:text-gray-800">
                      View Stack Trace
                    </summary>
                    <pre className="mt-2 p-2 bg-white rounded text-[1.1rem] overflow-x-auto">
                      {error.stackTrace}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
