"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIDraftCard } from "../../components/AIDreaftCard";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw } from "lucide-react";
import { useConfirmationDialog } from "@/components/ui/confirmation-dialog";
import {
  useAIDrafts,
  useReviewedAIDrafts,
  useReviewAIDraft,
  useBulkCrawlAIDraftDetails,
} from "@/hooks/useAIDrafts";
import { useDraftMonitoring } from "@/hooks/useDraftMonitoring";
import EditAIDraftModal from "./components/EditAIDraftModal";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type CrawlEngine = "SCRAPER_DO" | "CHEERIO" | "PLAYWRIGHT";

export default function AdminAIDraftPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"New" | "Crawled" | "Reviewed">("New");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);
  const [selectedDraftIds, setSelectedDraftIds] = useState<Set<string>>(
    new Set()
  );
  const [crawlEngine, setCrawlEngine] = useState<CrawlEngine>("CHEERIO");
  const { toast } = useToast();
  const { confirm, dialog } = useConfirmationDialog();

  // Subscribe to all draft updates
  useDraftMonitoring({
    onStatusUpdate: (update) => {
      toast({
        title: "Draft Status Updated",
        description: `Draft "${
          update.draft?.title || update.draftId
        }" status changed to ${update.status}`,
      });
    },
  });

  // React Query hooks
  const { data: pendingData, isLoading: pendingLoading } = useAIDrafts(
    "PENDING",
    100
  );
  const { data: crawledData, isLoading: crawledLoading } = useAIDrafts(
    "CRAWLED",
    100
  );
  const { data: reviewedData, isLoading: reviewedLoading } =
    useReviewedAIDrafts();
  const reviewMutation = useReviewAIDraft();
  const bulkCrawlMutation = useBulkCrawlAIDraftDetails();

  const pendingDrafts = pendingData?.data?.drafts || [];
  const crawledDrafts = crawledData?.data?.drafts || [];
  const reviewedDrafts = reviewedData?.data?.drafts || [];
  const loading = pendingLoading || crawledLoading || reviewedLoading;

  // Multi-select handlers
  const handleSelectChange = (id: string, selected: boolean) => {
    setSelectedDraftIds((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = (drafts: { id: string }[]) => {
    const allIds = drafts.map((d) => d.id);
    const allSelected = allIds.every((id) => selectedDraftIds.has(id));

    setSelectedDraftIds((prev) => {
      const newSet = new Set(prev);
      if (allSelected) {
        allIds.forEach((id) => newSet.delete(id));
      } else {
        allIds.forEach((id) => newSet.add(id));
      }
      return newSet;
    });
  };

  const handleBulkCrawl = async () => {
    if (selectedDraftIds.size === 0) return;

    const confirmed = await confirm({
      title: "Bulk Crawl Details",
      description: `This will crawl details for ${selectedDraftIds.size} selected draft(s) using ${crawlEngine}. Continue?`,
      confirmText: "Start Crawling",
    });

    if (confirmed) {
      bulkCrawlMutation.mutate(
        { draftIds: Array.from(selectedDraftIds), engine: crawlEngine },
        {
          onSuccess: (response) => {
            if (response.success) {
              toast({
                title: "Bulk Crawl Started",
                description: `Queued ${
                  response.data?.queued || selectedDraftIds.size
                } drafts for crawling`,
              });
              setSelectedDraftIds(new Set());
            }
          },
          onError: () => {
            toast({
              title: "Error",
              description: "Failed to start bulk crawl",
              variant: "destructive",
            });
          },
        }
      );
    }
  };

  const clearSelection = () => {
    setSelectedDraftIds(new Set());
  };

  const handleApprove = async (id: string) => {
    const confirmed = await confirm({
      title: "Approve Draft",
      description:
        "Approving this draft will automatically create and publish a live opportunity on the platform. Continue?",
      confirmText: "Approve",
    });

    if (confirmed) {
      reviewMutation.mutate(
        { id, data: { status: "APPROVED" } },
        {
          onSuccess: (response) => {
            if (response.success) {
              toast({
                title: "Success",
                description:
                  "Draft approved and opportunity created successfully! The opportunity is now live on the platform.",
              });
            }
          },
          onError: () => {
            toast({
              title: "Error",
              description: "Failed to approve draft",
              variant: "destructive",
            });
          },
        }
      );
    }
  };

  const handleReject = (id: string) => {
    reviewMutation.mutate(
      {
        id,
        data: {
          status: "REJECTED",
          rejectionReason: "Does not meet quality standards",
        },
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            toast({
              title: "Success",
              description: "Draft rejected successfully",
            });
          }
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to reject draft",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleEdit = (id: string) => {
    setSelectedDraftId(id);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedDraftId(null);
  };

  return (
    <>
      {dialog}
      <div className="h-full flex flex-col overflow-y-scroll">
        <div className="p-8 pb-20">
          <Tabs defaultValue={tab} className="">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <TabsList className="w-auto h-18 text-[1.8rem]! rounded-xl! p-4 bg-[#E8EAED]! text-black/50 border border-[#E3E3E3]">
                <TabsTrigger
                  className={`py-1! px-6! h-[33px] rounded-xl text-[1.8rem] active:bg-none ${
                    tab == "New"
                      ? "bg-white! text-black/50"
                      : "bg-[#E8EAED]! text-black/50"
                  }`}
                  value="New"
                  onClick={() => setTab("New")}
                >
                  New ({pendingDrafts.length})
                </TabsTrigger>
                <TabsTrigger
                  className={`py-1! px-6! h-[33px] rounded-xl text-[1.8rem] active:bg-none ${
                    tab == "Crawled"
                      ? "bg-white! text-black/50"
                      : "bg-[#E8EAED]! text-black/50"
                  }`}
                  value="Crawled"
                  onClick={() => setTab("Crawled")}
                >
                  Crawled ({crawledDrafts.length})
                </TabsTrigger>
                <TabsTrigger
                  className={`py-1! px-6! h-[33px] rounded-xl text-[1.8rem] active:bg-none ${
                    tab == "Reviewed"
                      ? "bg-white! text-black/50"
                      : "bg-[#E8EAED]! text-black/50"
                  }`}
                  value="Reviewed"
                  onClick={() => setTab("Reviewed")}
                >
                  Reviewed ({reviewedDrafts.length})
                </TabsTrigger>
              </TabsList>

              {/* Bulk Action Bar */}
              {selectedDraftIds.size > 0 && (
                <div className="flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <span className="text-[1.4rem] text-blue-700 font-medium">
                    {selectedDraftIds.size} selected
                  </span>
                  <Select
                    value={crawlEngine}
                    onValueChange={(value: CrawlEngine) =>
                      setCrawlEngine(value)
                    }
                  >
                    <SelectTrigger className="w-40! h-12! text-[1.2rem]! text-gray-600">
                      <SelectValue placeholder="Select engine" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem
                        className="w-40! h-12! text-[1.2rem]! text-gray-600"
                        value="SCRAPER_DO"
                      >
                        Scraper.do
                      </SelectItem>
                      <SelectItem
                        className="w-40! h-12! text-[1.2rem]! text-gray-600"
                        value="CHEERIO"
                      >
                        Cheerio
                      </SelectItem>
                      <SelectItem
                        className="w-40! h-12! text-[1.2rem]! text-gray-600"
                        value="PLAYWRIGHT"
                      >
                        Playwright
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleBulkCrawl}
                    disabled={bulkCrawlMutation.isPending}
                    className="h-12! text-[1.2rem] bg-blue-600 hover:bg-blue-700"
                  >
                    {bulkCrawlMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Bulk Crawl
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearSelection}
                    className="h-12 text-[1.2rem] bg-white text-gray-600"
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>
            <TabsContent className="py-12" value="New">
              <section className="bg-white border border-[#E3E3E3] rounded-2xl p-8 max-h-[100vh-10%] overflow-y-scroll">
                <div className="flex items-center justify-between">
                  <h3 className="text-[2.4rem] font-semibold">New AI Drafts</h3>
                  {pendingDrafts.length > 0 && (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={pendingDrafts.every((d) =>
                          selectedDraftIds.has(d.id)
                        )}
                        onCheckedChange={() => handleSelectAll(pendingDrafts)}
                        className="h-5 w-5"
                      />
                      <span className="text-[1.2rem] text-gray-600">
                        Select All
                      </span>
                    </label>
                  )}
                </div>
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : pendingDrafts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No pending drafts
                  </div>
                ) : (
                  <div>
                    {pendingDrafts.map((draft) => (
                      <AIDraftCard
                        key={draft.id}
                        id={draft.id}
                        title={draft.title}
                        source={draft.crawlSource?.name || "Unknown Source"}
                        date={new Date(draft.createdAt).toLocaleDateString()}
                        status="Pending"
                        isAIDraft
                        selectable
                        selected={selectedDraftIds.has(draft.id)}
                        onSelectChange={handleSelectChange}
                        onApprove={() => handleApprove(draft.id)}
                        onReject={() => handleReject(draft.id)}
                        onView={() => {
                          router.push(`/x/admin/ai-draft/${draft.id}`);
                        }}
                        onEdit={() => handleEdit(draft.id)}
                      />
                    ))}
                  </div>
                )}
              </section>
            </TabsContent>
            <TabsContent className="py-12" value="Crawled">
              <section className="bg-white border border-[#E3E3E3] rounded-2xl p-8 max-h-[700px] overflow-y-scroll">
                <div className="flex items-center justify-between">
                  <h3 className="text-[2.4rem] font-semibold">
                    Crawled AI Drafts
                  </h3>
                  {crawledDrafts.length > 0 && (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={crawledDrafts.every((d) =>
                          selectedDraftIds.has(d.id)
                        )}
                        onCheckedChange={() => handleSelectAll(crawledDrafts)}
                        className="h-5 w-5"
                      />
                      <span className="text-[1.2rem] text-gray-600">
                        Select All
                      </span>
                    </label>
                  )}
                </div>
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : crawledDrafts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No crawled drafts
                  </div>
                ) : (
                  <div>
                    {crawledDrafts.map((draft) => (
                      <AIDraftCard
                        key={draft.id}
                        id={draft.id}
                        title={draft.title}
                        source={draft.crawlSource?.name || "Unknown Source"}
                        date={new Date(draft.createdAt).toLocaleDateString()}
                        status="Crawled"
                        isAIDraft
                        selectable
                        selected={selectedDraftIds.has(draft.id)}
                        onSelectChange={handleSelectChange}
                        onApprove={() => handleApprove(draft.id)}
                        onReject={() => handleReject(draft.id)}
                        onView={() => {
                          router.push(`/x/admin/ai-draft/${draft.id}`);
                        }}
                        onEdit={() => handleEdit(draft.id)}
                      />
                    ))}
                  </div>
                )}
              </section>
            </TabsContent>
            <TabsContent className="py-12" value="Reviewed">
              <section className="bg-white border border-[#E3E3E3] rounded-2xl p-8 max-h-[700px] overflow-y-scroll">
                <h3 className="text-[2.4rem] font-semibold">Reviewed Drafts</h3>
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : reviewedDrafts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No reviewed drafts
                  </div>
                ) : (
                  <div>
                    {reviewedDrafts.map((draft) => (
                      <AIDraftCard
                        key={draft.id}
                        title={draft.title}
                        source={draft.crawlSource?.name || "Unknown Source"}
                        date={new Date(draft.createdAt).toLocaleDateString()}
                        status={
                          draft.status === "PUBLISHED"
                            ? "Published"
                            : draft.status === "APPROVED"
                            ? "Approved"
                            : draft.status === "REJECTED"
                            ? "Rejected"
                            : "Pending"
                        }
                        opportunityId={draft.opportunityId}
                        isAIDraft={false}
                        onView={() => {
                          router.push(`/x/admin/ai-draft/${draft.id}`);
                        }}
                      />
                    ))}
                  </div>
                )}
              </section>
            </TabsContent>
          </Tabs>

          {/* Edit Modal */}
          {selectedDraftId && (
            <EditAIDraftModal
              draftId={selectedDraftId}
              isOpen={editModalOpen}
              onClose={handleCloseEditModal}
            />
          )}
        </div>
      </div>
    </>
  );
}
