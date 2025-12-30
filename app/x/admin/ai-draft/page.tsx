"use client";
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIDraftCard } from "../../components/AIDreaftCard";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useAIDrafts, useReviewedAIDrafts, useReviewAIDraft } from "@/hooks/useAIDrafts";

export default function AdminAIDraftPage() {
  const [tab, setTab] = useState<"New" | "Reviewed">("New");
  const { toast } = useToast();
  const { confirm, dialog } = useConfirmationDialog();
  
  // React Query hooks
  const { data: pendingData, isLoading: pendingLoading } = useAIDrafts('PENDING', 100);
  const { data: reviewedData, isLoading: reviewedLoading } = useReviewedAIDrafts();
  const reviewMutation = useReviewAIDraft();

  const pendingDrafts = pendingData?.data?.drafts || [];
  const reviewedDrafts = reviewedData?.data?.drafts || [];
  const loading = pendingLoading || reviewedLoading;


  const handleApprove = (id: string) => {
    confirm({
      title: "Approve Draft",
      description: "Approving this draft will automatically create and publish a live opportunity on the platform. Continue?",
      onConfirm: () => {
        reviewMutation.mutate(
          { id, data: { status: "APPROVED" } },
          {
            onSuccess: (response) => {
              if (response.success) {
                toast({
                  title: "Success",
                  description: "Draft approved and opportunity created successfully! The opportunity is now live on the platform.",
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
      },
      confirmText: "Approve"
    });
  };

  const handleReject = (id: string) => {
    reviewMutation.mutate(
      { 
        id, 
        data: { 
          status: "REJECTED",
          rejectionReason: "Does not meet quality standards" 
        } 
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

  return (
    <AdminLayout>
      {dialog}
      <section className="p-8">
        <Tabs defaultValue={tab} className="">
          <TabsList className="w-[25.9rem] h-18 text-[1.8rem]! rounded-xl! p-4 bg-[#E8EAED]! text-black/50 border border-[#E3E3E3]">
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
          <TabsContent className="py-12" value="New">
            <section className="bg-white border border-[#E3E3E3] rounded-2xl p-8">
              <h3 className="text-[2.4rem] font-semibold">New AI Drafts</h3>
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
                      title={draft.title}
                      source={draft.crawlSource?.name || "Unknown Source"}
                      date={new Date(draft.createdAt).toLocaleDateString()}
                      status="Pending"
                      isAIDraft
                      onApprove={() => handleApprove(draft.id)}
                      onReject={() => handleReject(draft.id)}
                      onView={() => {
                        window.open(draft.sourceUrl, "_blank");
                      }}
                      onEdit={() => {
                        // TODO: Implement edit functionality
                      }}
                    />
                  ))}
                </div>
              )}
            </section>
          </TabsContent>
          <TabsContent className="py-12" value="Reviewed">
            <section className="bg-white border border-[#E3E3E3] rounded-2xl p-8">
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
                        window.open(draft.sourceUrl, "_blank");
                      }}
                    />
                  ))}
                </div>
              )}
            </section>
          </TabsContent>
        </Tabs>
      </section>
    </AdminLayout>
  );
}
