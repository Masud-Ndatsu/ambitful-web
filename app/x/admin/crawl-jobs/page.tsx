"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../../components/DataTable";
import { crawlJobColumns } from "./column";
import {
  useCrawlJobs,
  useCrawlJobStats,
  useQueueMetrics,
  useCancelCrawlJob,
  useRetryCrawlJob,
  useCleanupOldJobs,
} from "@/hooks/useCrawlJobs";
import { Modal } from "@/components/Modal";
import { useConfirmationDialog } from "@/components/ui/confirmation-dialog";
import {
  Trash2,
  Filter,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobDetailsModal from "./components/JobDetailsModal";

export default function CrawlJobsPage() {
  const [selectedStatus, setSelectedStatus] = useState<
    | "QUEUED"
    | "ACTIVE"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED"
    | "RETRYING"
    | "all"
  >("all");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const { confirm, dialog } = useConfirmationDialog();

  // Fetch data
  const { data: jobsData, isLoading } = useCrawlJobs({
    status: selectedStatus !== "all" ? selectedStatus : undefined,
    limit: 50,
  });

  const { data: stats } = useCrawlJobStats();
  const { data: queueMetrics } = useQueueMetrics();

  // Mutations
  const cancelMutation = useCancelCrawlJob();
  const retryMutation = useRetryCrawlJob();
  const cleanupMutation = useCleanupOldJobs();

  const jobs = jobsData?.jobs || [];

  // Handlers
  const handleViewDetails = useCallback((jobId: string) => {
    setSelectedJobId(jobId);
    setShowDetailsModal(true);
  }, []);

  const handleCancel = useCallback(
    async (jobId: string) => {
      const confirmed = await confirm({
        title: "Cancel Crawl Job",
        description:
          "Are you sure you want to cancel this crawl job? This action cannot be undone.",
        confirmText: "Cancel Job",
        cancelText: "Keep Running",
      });

      if (confirmed) {
        cancelMutation.mutate(jobId);
      }
    },
    [confirm, cancelMutation]
  );

  const handleRetry = useCallback(
    async (jobId: string) => {
      const confirmed = await confirm({
        title: "Retry Crawl Job",
        description:
          "This will create a new crawl job with the same configuration. Continue?",
        confirmText: "Retry",
        cancelText: "Cancel",
      });

      if (confirmed) {
        retryMutation.mutate(jobId);
      }
    },
    [confirm, retryMutation]
  );

  const handleCleanup = useCallback(async () => {
    const confirmed = await confirm({
      title: "Cleanup Old Jobs",
      description:
        "This will delete all completed jobs older than 30 days. Continue?",
      confirmText: "Cleanup",
      cancelText: "Cancel",
    });

    if (confirmed) {
      cleanupMutation.mutate(30);
    }
  }, [confirm, cleanupMutation]);

  const handleStatusFilter = useCallback((status: typeof selectedStatus) => {
    setSelectedStatus(status);
    setShowFilterDropdown(false);
  }, []);

  const columns = useMemo(() => crawlJobColumns, []);

  const tableMetadata = useMemo(
    () => ({
      onViewDetails: handleViewDetails,
      onCancel: handleCancel,
      onRetry: handleRetry,
    }),
    [handleViewDetails, handleCancel, handleRetry]
  );

  const statusDisplayText =
    selectedStatus === "all"
      ? "All Statuses"
      : selectedStatus.charAt(0) + selectedStatus.slice(1).toLowerCase();

  return (
    <>
      {dialog}
      <div className="h-full flex flex-col overflow-y-scroll">
        <div className="p-8 pb-20 bg-[#F8F9FC] text-[#0F1729]">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white border-[#E3E3E3] rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[1.4rem] font-medium text-[#0F1729]">
                  Total Jobs
                </CardTitle>
                <Activity className="h-5 w-5 text-[#505662]" />
              </CardHeader>
              <CardContent>
                <div className="text-[2.4rem] font-bold text-[#0F1729]">
                  {stats?.total || 0}
                </div>
                <p className="text-[1.2rem] text-[#505662]">
                  {stats?.successRate?.toFixed(1) || 0}% success rate
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#E3E3E3] rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[1.4rem] font-medium text-[#0F1729]">
                  Active Jobs
                </CardTitle>
                <Clock className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-[2.4rem] font-bold text-blue-600">
                  {stats?.active || 0}
                </div>
                <p className="text-[1.2rem] text-[#505662]">
                  {queueMetrics?.queueDepth || 0} queued
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#E3E3E3] rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[1.4rem] font-medium text-[#0F1729]">
                  Completed
                </CardTitle>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-[2.4rem] font-bold text-green-600">
                  {stats?.completed || 0}
                </div>
                <p className="text-[1.2rem] text-[#505662]">
                  {stats?.totalItemsCreated || 0} items created
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#E3E3E3] rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[1.4rem] font-medium text-[#0F1729]">
                  Failed
                </CardTitle>
                <XCircle className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-[2.4rem] font-bold text-red-600">
                  {stats?.failed || 0}
                </div>
                <p className="text-[1.2rem] text-[#505662]">
                  {stats?.retrying || 0} retrying
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Header with filters */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[2.4rem] font-semibold text-[#0F1729] mb-2">
                Crawl Jobs
              </h1>
              <p className="text-[#505662] text-[1.4rem]">
                Monitor and manage web crawling jobs
              </p>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Button
                  variant="outline"
                  className="text-[1.4rem] bg-white! font-semibold rounded-2xl gap-3 border-[#E3E3E3] hover:bg-[#F8F9FC]!"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <Filter className="h-4 w-4" />
                  {statusDisplayText}
                </Button>

                {showFilterDropdown && (
                  <div className="absolute top-full mt-2 right-0 bg-white border border-[#E3E3E3] rounded-2xl shadow-lg z-10 min-w-[180px] overflow-hidden">
                    <button
                      onClick={() => handleStatusFilter("all")}
                      className="block w-full text-left px-4 py-3 hover:bg-[#F8F9FC] text-[1.4rem] text-[#0F1729] transition-colors"
                    >
                      All Statuses
                    </button>
                    <button
                      onClick={() => handleStatusFilter("QUEUED")}
                      className="block w-full text-left px-4 py-3 hover:bg-[#F8F9FC] text-[1.4rem] text-[#0F1729] transition-colors"
                    >
                      Queued
                    </button>
                    <button
                      onClick={() => handleStatusFilter("ACTIVE")}
                      className="block w-full text-left px-4 py-3 hover:bg-[#F8F9FC] text-[1.4rem] text-[#0F1729] transition-colors"
                    >
                      Active
                    </button>
                    <button
                      onClick={() => handleStatusFilter("COMPLETED")}
                      className="block w-full text-left px-4 py-3 hover:bg-[#F8F9FC] text-[1.4rem] text-[#0F1729] transition-colors"
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => handleStatusFilter("FAILED")}
                      className="block w-full text-left px-4 py-3 hover:bg-[#F8F9FC] text-[1.4rem] text-[#0F1729] transition-colors"
                    >
                      Failed
                    </button>
                    <button
                      onClick={() => handleStatusFilter("CANCELLED")}
                      className="block w-full text-left px-4 py-3 hover:bg-[#F8F9FC] text-[1.4rem] text-[#0F1729] transition-colors"
                    >
                      Cancelled
                    </button>
                    <button
                      onClick={() => handleStatusFilter("RETRYING")}
                      className="block w-full text-left px-4 py-3 hover:bg-[#F8F9FC] text-[1.4rem] text-[#0F1729] transition-colors"
                    >
                      Retrying
                    </button>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                className="text-[1.4rem] bg-white! font-semibold rounded-2xl gap-3 border-[#E3E3E3] hover:bg-red-50! text-red-600 hover:text-red-700 hover:border-red-200"
                onClick={handleCleanup}
                disabled={cleanupMutation.isPending}
              >
                <Trash2 className="h-4 w-4" />
                Cleanup Old Jobs
              </Button>
            </div>
          </header>

          {/* Jobs Table */}
          <section className="bg-white rounded-2xl border border-[#E3E3E3] p-6">
            <DataTable
              columns={columns}
              data={jobs}
              isLoading={isLoading}
              meta={tableMetadata}
            />
          </section>

          {/* Job Details Modal */}
          {selectedJobId && (
            <Modal
              isOpen={showDetailsModal}
              onClose={() => {
                setShowDetailsModal(false);
                setSelectedJobId(null);
              }}
            >
              <JobDetailsModal
                jobId={selectedJobId}
                onClose={() => {
                  setShowDetailsModal(false);
                  setSelectedJobId(null);
                }}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
