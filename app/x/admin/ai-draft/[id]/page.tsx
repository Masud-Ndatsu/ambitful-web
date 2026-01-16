"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import {
  useAIDraftById,
  useReviewAIDraft,
  useCrawlAIDraftDetails,
} from "@/hooks/useAIDrafts";
import { useDraftMonitoring } from "@/hooks/useDraftMonitoring";
import {
  Loader2,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Calendar,
  MapPin,
  Clock,
  Mail,
  Award,
  Users,
  RefreshCw,
  Globe,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/Modal";

export default function ViewAIDraftPage() {
  const params = useParams();
  const router = useRouter();
  const draftId = params.id as string;
  const { toast } = useToast();
  const { confirm, dialog } = useConfirmationDialog();
  const [crawlModalOpen, setCrawlModalOpen] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState<
    "SCRAPER_DO" | "CHEERIO" | "PLAYWRIGHT"
  >("SCRAPER_DO");

  const { data, isLoading } = useAIDraftById(draftId);
  const reviewMutation = useReviewAIDraft();
  const crawlDetailsMutation = useCrawlAIDraftDetails();

  // Subscribe to this specific draft's updates
  useDraftMonitoring({
    draftId,
    onStatusUpdate: (update) => {
      toast({
        title: "Status Updated",
        description: `Draft status changed to ${update.status}`,
      });
    },
  });

  const draft = data?.data;

  // Calculate days ago
  const daysAgo = useMemo(() => {
    if (!draft) return 0;
    const now = new Date().getTime();
    const createdTime = new Date(draft.createdAt).getTime();
    return Math.floor((now - createdTime) / (1000 * 60 * 60 * 24));
  }, [draft]);

  const handleApprove = useCallback(async () => {
    const confirmed = await confirm({
      title: "Approve Draft",
      description:
        "Approving this draft will automatically create and publish a live opportunity on the platform. Continue?",
      confirmText: "Approve & Publish",
    });

    if (confirmed) {
      reviewMutation.mutate(
        { id: draftId, data: { status: "APPROVED" } },
        {
          onSuccess: (response) => {
            if (response.success) {
              toast({
                title: "Success",
                description:
                  "Draft approved and opportunity created successfully!",
              });
              router.push("/x/admin/ai-draft");
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
  }, [confirm, draftId, reviewMutation, toast, router]);

  const handleReject = useCallback(async () => {
    const confirmed = await confirm({
      title: "Reject Draft",
      description: "Are you sure you want to reject this draft?",
      confirmText: "Reject",
    });

    if (confirmed) {
      reviewMutation.mutate(
        {
          id: draftId,
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
              router.push("/x/admin/ai-draft");
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
    }
  }, [confirm, draftId, reviewMutation, toast, router]);

  const handleCrawlDetails = useCallback(() => {
    setCrawlModalOpen(true);
  }, []);

  const handleCloseCrawlModal = useCallback(() => {
    setCrawlModalOpen(false);
  }, []);

  const handleEngineChange = useCallback(
    (engine: "SCRAPER_DO" | "CHEERIO" | "PLAYWRIGHT") => {
      setSelectedEngine(engine);
    },
    []
  );

  const handleCrawlSubmit = useCallback(async () => {
    try {
      const response = await crawlDetailsMutation.mutateAsync({
        id: draftId,
        engine: selectedEngine,
      });

      setCrawlModalOpen(false);

      if (response.success) {
        toast({
          title: "Success",
          description:
            "Details page crawl initiated successfully! The draft will be updated once crawling is complete.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to initiate details page crawl",
        variant: "destructive",
      });
    }
  }, [draftId, selectedEngine, crawlDetailsMutation, toast]);

  const statusColors = useMemo(
    () => ({
      PENDING: "bg-[#F59F0A1A] text-[#F59F0A]",
      CRAWLING: "bg-[#8B5CF61A] text-[#8B5CF6]",
      CRAWLED: "bg-[#06B6D41A] text-[#06B6D4]",
      APPROVED: "bg-[#21C45D1A] text-[#21C45D]",
      REJECTED: "bg-[#EF43431A] text-[#EF4343]",
      PUBLISHED: "bg-[#3B82F61A] text-[#3B82F6]",
    }),
    []
  );

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-[#007947]" />
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-[2.4rem] font-bold mb-4 text-[#0F1729]">
            AI Draft not found
          </h1>
          <Button onClick={() => router.push("/x/admin/ai-draft")}>
            Back to AI Drafts
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {dialog}
      <div className="h-full flex flex-col overflow-y-scroll">
            <div className="p-8 pb-20">
              {/* Breadcrumbs */}
              <div className="bg-white border border-[#E3E3E3] rounded-xl px-6 py-4 mb-6">
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 text-[1.4rem] text-[#505662] hover:text-[#0F1729] transition-colors font-degular"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>AI Drafts</span>
                  <span>/</span>
                  <span className="text-[#0F1729] font-medium truncate max-w-[500px]">
                    {draft.title}
                  </span>
                </button>
              </div>

              {/* Content Container */}
              <div className="max-w-[1400px] mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Header Card */}
                    <div className="bg-white rounded-2xl p-8 border border-[#E3E3E3]">
                      <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-6 flex-1 min-w-0">
                          {/* Organization Logo */}
                          <div className="h-[6.4rem] w-[6.4rem] grid place-items-center bg-[#007947] text-white rounded-2xl shrink-0 font-bold text-[2.4rem]">
                            {draft.organization
                              ? draft.organization.charAt(0).toUpperCase()
                              : "A"}
                          </div>

                          {/* Title and Meta */}
                          <div className="flex-1 min-w-0">
                            <h1 className="text-[2.8rem] font-bold text-[#0F1729] mb-2 font-degular break-words">
                              {draft.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-[1.4rem] text-[#505662] mb-4 font-degular">
                              <span className="font-medium">
                                {draft.organization || "Unknown Organization"}
                              </span>
                              {draft.locations &&
                                draft.locations.length > 0 && (
                                  <>
                                    <span>•</span>
                                    <span>{draft.locations[0]}</span>
                                  </>
                                )}
                              <span>•</span>
                              <span>Created {daysAgo} days ago</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge
                                className={`${
                                  statusColors[draft.status]
                                } text-[1.2rem] px-3 py-1 font-degular`}
                              >
                                {draft.status}
                              </Badge>
                              <Badge
                                className={`${
                                  draft.isDetailsCrawled
                                    ? "bg-[#3B82F61A] text-[#3B82F6]"
                                    : "bg-[#E3E3E3] text-[#505662]"
                                } text-[1.2rem] px-3 py-1 font-degular`}
                              >
                                {draft.isDetailsCrawled
                                  ? "Details Crawled"
                                  : "Listing Only"}
                              </Badge>
                              {draft.compensation && (
                                <Badge className="bg-[#E7F5E1] text-[#007947] border-0 text-[1.2rem] px-3 py-2 font-semibold font-degular">
                                  {draft.compensation}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {draft.status === "PENDING" && (
                          <div className="flex flex-wrap gap-3 pt-4 border-t border-[#E3E3E3]">
                            {!draft.isDetailsCrawled && (
                              <Button
                                onClick={handleCrawlDetails}
                                variant="outline"
                                className="flex items-center gap-2 border-[#E3E3E3] text-[#0F1729] text-[1.4rem] font-semibold px-6 py-5 rounded-xl hover:bg-[#F6F8FB] font-degular"
                                disabled={crawlDetailsMutation.isPending}
                              >
                                {crawlDetailsMutation.isPending ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <RefreshCw className="h-4 w-4" />
                                )}
                                Crawl Details Page
                              </Button>
                            )}
                            <Button
                              onClick={handleReject}
                              variant="outline"
                              className="flex items-center gap-2 border-[#E3E3E3] text-[#EF4343] text-[1.4rem] font-semibold px-6 py-5 rounded-xl hover:bg-red-50 font-degular"
                              disabled={reviewMutation.isPending}
                            >
                              <XCircle className="h-4 w-4" />
                              Reject Draft
                            </Button>
                            <Button
                              onClick={handleApprove}
                              className="flex items-center gap-2 bg-[#007947] hover:bg-[#00df82] text-white text-[1.4rem] font-semibold px-6 py-5 rounded-xl transition-colors"
                              disabled={reviewMutation.isPending}
                            >
                              {reviewMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4" />
                              )}
                              Approve & Publish
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* About the Opportunity */}
                    <div className="bg-white rounded-2xl p-8 border border-[#E3E3E3]">
                      <h2 className="text-[2rem] font-bold text-[#0F1729] mb-4 font-degular">
                        About the Opportunity
                      </h2>
                      <p className="text-[1.4rem] text-[#505662] leading-relaxed whitespace-pre-wrap font-degular">
                        {draft.description}
                      </p>
                    </div>

                    {/* Requirements */}
                    {draft.requirements && draft.requirements.length > 0 && (
                      <div className="bg-white rounded-2xl p-8 border border-[#E3E3E3]">
                        <h2 className="text-[2rem] font-bold text-[#0F1729] mb-4 font-degular">
                          Requirements
                        </h2>
                        <ul className="space-y-3">
                          {draft.requirements.map((req, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-[1.4rem] text-[#505662] font-degular"
                            >
                              <span className="text-[#007947] mt-1">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Benefits & Perks */}
                    {draft.benefits && draft.benefits.length > 0 && (
                      <div className="bg-white rounded-2xl p-8 border border-[#E3E3E3]">
                        <h2 className="text-[2rem] font-bold text-[#0F1729] mb-6 font-degular">
                          Benefits & Perks
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {draft.benefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-4 bg-[#F6F8FB] rounded-xl"
                            >
                              <div className="h-10 w-10 rounded-lg bg-[#007947] flex items-center justify-center shrink-0">
                                <CheckCircle2 className="h-5 w-5 text-white" />
                              </div>
                              <span className="text-[1.4rem] text-[#0F1729] font-medium font-degular">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Sidebar */}
                  <div className="space-y-6">
                    {/* Source Information */}
                    <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3]">
                      <div className="flex items-center gap-3 mb-2">
                        <Globe className="h-5 w-5 text-[#505662]" />
                        <span className="text-[1.2rem] text-[#505662] uppercase font-semibold font-degular">
                          Crawl Source
                        </span>
                      </div>
                      <p className="text-[1.4rem] font-bold text-[#0F1729] mb-3 font-degular">
                        {draft.crawlSource?.name || "Unknown Source"}
                      </p>
                      <a
                        href={draft.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[1.2rem] text-[#007947] hover:text-[#00df82] font-semibold font-degular"
                      >
                        View Original Page
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>

                    {/* Application Deadline */}
                    <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3]">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="h-5 w-5 text-[#505662]" />
                        <span className="text-[1.2rem] text-[#505662] uppercase font-semibold font-degular">
                          Application Deadline
                        </span>
                      </div>
                      <p className="text-[1.4rem] font-bold text-[#0F1729] font-degular">
                        {formatDate(draft.deadline)}
                      </p>
                    </div>

                    {/* Eligibility */}
                    {draft.eligibility && draft.eligibility.length > 0 && (
                      <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3]">
                        <div className="flex items-center gap-3 mb-2">
                          <Users className="h-5 w-5 text-[#505662]" />
                          <span className="text-[1.2rem] text-[#505662] uppercase font-semibold font-degular">
                            Eligibility
                          </span>
                        </div>
                        <p className="text-[1.4rem] font-bold text-[#0F1729] font-degular">
                          {draft.eligibility.join(", ")}
                        </p>
                      </div>
                    )}

                    {/* Experience Level */}
                    {draft.experienceLevel && (
                      <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3]">
                        <div className="flex items-center gap-3 mb-2">
                          <Award className="h-5 w-5 text-[#505662]" />
                          <span className="text-[1.2rem] text-[#505662] uppercase font-semibold font-degular">
                            Experience Level
                          </span>
                        </div>
                        <p className="text-[1.4rem] font-bold text-[#0F1729] font-degular">
                          {draft.experienceLevel}
                        </p>
                      </div>
                    )}

                    {/* Duration */}
                    {draft.duration && (
                      <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3]">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="h-5 w-5 text-[#505662]" />
                          <span className="text-[1.2rem] text-[#505662] uppercase font-semibold font-degular">
                            Duration
                          </span>
                        </div>
                        <p className="text-[1.4rem] font-bold text-[#0F1729] font-degular">
                          {draft.duration}
                        </p>
                      </div>
                    )}

                    {/* Location */}
                    {draft.locations && draft.locations.length > 0 && (
                      <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3]">
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="h-5 w-5 text-[#505662]" />
                          <span className="text-[1.2rem] text-[#505662] uppercase font-semibold font-degular">
                            Location{draft.locations.length > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {draft.locations.map((location, index) => (
                            <p
                              key={index}
                              className="text-[1.4rem] font-bold text-[#0F1729] font-degular"
                            >
                              {location}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Information */}
                    {(draft.contactEmail || draft.applicationUrl) && (
                      <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3]">
                        <h3 className="text-[1.4rem] font-bold text-[#0F1729] mb-3 font-degular">
                          Contact & Application
                        </h3>
                        <div className="space-y-3">
                          {draft.contactEmail && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-[#505662]" />
                              <a
                                href={`mailto:${draft.contactEmail}`}
                                className="text-[1.2rem] text-[#007947] hover:text-[#00df82] font-semibold font-degular break-all"
                              >
                                {draft.contactEmail}
                              </a>
                            </div>
                          )}
                          {draft.applicationUrl && (
                            <Button
                              className="w-full bg-[#007947] hover:bg-[#00df82] text-white text-[1.4rem] font-semibold py-5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                              onClick={() =>
                                window.open(draft.applicationUrl!, "_blank")
                              }
                            >
                              <ExternalLink className="h-4 w-4" />
                              Visit Application Page
                            </Button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3]">
                      <h3 className="text-[1.2rem] text-[#505662] uppercase font-semibold mb-3 font-degular">
                        Metadata
                      </h3>
                      <div className="space-y-2 text-[1.2rem] text-[#505662] font-degular">
                        <div>
                          <span className="font-semibold">Created:</span>{" "}
                          {new Date(draft.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-semibold">Updated:</span>{" "}
                          {new Date(draft.updatedAt).toLocaleDateString()}
                        </div>
                        {draft.reviewedAt && (
                          <div>
                            <span className="font-semibold">Reviewed:</span>{" "}
                            {new Date(draft.reviewedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
      {/* Crawl Engine Selection Modal */}
        <Modal isOpen={crawlModalOpen} onClose={handleCloseCrawlModal}>
          <div className="w-[500px] text-[#0F1729]">
            <h2 className="text-[2.4rem] font-semibold mb-4">
              Select Crawl Engine
            </h2>
            <p className="text-[1.4rem] text-gray-600 mb-6">
              Choose which crawler engine to use for extracting the details
              page information.
            </p>

            <div className="space-y-4 mb-6">
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="crawlEngine"
                  value="SCRAPER_DO"
                  checked={selectedEngine === "SCRAPER_DO"}
                  onChange={() => handleEngineChange("SCRAPER_DO")}
                  className="w-4 h-4"
                />
                <div>
                  <p className="text-[1.6rem] font-medium">Scraper.do</p>
                  <p className="text-[1.2rem] text-gray-500">
                    Professional web scraping API with proxy support
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="crawlEngine"
                  value="CHEERIO"
                  checked={selectedEngine === "CHEERIO"}
                  onChange={() => handleEngineChange("CHEERIO")}
                  className="w-4 h-4"
                />
                <div>
                  <p className="text-[1.6rem] font-medium">Cheerio</p>
                  <p className="text-[1.2rem] text-gray-500">
                    Fast and lightweight HTML parser
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="crawlEngine"
                  value="PLAYWRIGHT"
                  checked={selectedEngine === "PLAYWRIGHT"}
                  onChange={() => handleEngineChange("PLAYWRIGHT")}
                  className="w-4 h-4"
                />
                <div>
                  <p className="text-[1.6rem] font-medium">Playwright</p>
                  <p className="text-[1.2rem] text-gray-500">
                    Full browser automation for dynamic content
                  </p>
                </div>
              </label>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handleCloseCrawlModal}
                className="text-[1.4rem]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCrawlSubmit}
                className="text-[1.4rem] bg-[#03624C] hover:bg-[#024d3d]"
                disabled={crawlDetailsMutation.isPending}
              >
                {crawlDetailsMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Crawling...
                  </>
                ) : (
                  "Start Crawl"
                )}
              </Button>
            </div>
          </div>
        </Modal>
    </>
  );
}
