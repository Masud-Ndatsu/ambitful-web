"use client";
import {
  Briefcase,
  CircleCheck,
  Users,
  TrendingUp,
  FileText,
} from "lucide-react";
import MetricTile from "./components/MetricTile";
import { AIDraftCard } from "../../components/AIDreaftCard";
import RecentActivityCard from "./components/RecentActivityCard";
import SiteVisitChart from "../../components/SiteVisitChart";
import RegionProgress from "../../components/RegionProgress";
import AdminLayout from "../../components/AdminLayout";
import { useOpportunityStats } from "@/hooks/useOpportunities";
import { usePendingAIDrafts, useReviewAIDraft } from "@/hooks/useAIDrafts";
import { useToast } from "@/hooks/use-toast";
import { useConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useOpportunityStats();
  const { data: pendingData } = usePendingAIDrafts(3);
  const reviewMutation = useReviewAIDraft();
  const { toast } = useToast();
  const { confirm, dialog } = useConfirmationDialog();
  const router = useRouter();

  const pendingDrafts = pendingData?.data?.drafts || [];

  const handleApprove = (id: string) => {
    confirm({
      title: "Approve Draft",
      description: "Approving this draft will automatically create and publish a live opportunity. Continue?",
      onConfirm: () => {
        reviewMutation.mutate(
          { id, data: { status: "APPROVED" } },
          {
            onSuccess: (response) => {
              if (response.success) {
                toast({
                  title: "Success",
                  description: "Draft approved and opportunity published successfully!",
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
      <div className="p-8 pb-48 grid gap-8 place-items-center max-h-screen overflow-y-scroll scroll-smooth">
        <header className="flex gap-[1.1rem]">
          <MetricTile
            title="Total Opportunities"
            count={isLoading ? 0 : stats?.total || 0}
            percentage={1.25}
            icon={Briefcase}
          />
          <MetricTile
            title="Published"
            count={isLoading ? 0 : stats?.published || 0}
            percentage={
              stats?.total
                ? Math.round((stats.published / stats.total) * 100)
                : 0
            }
            icon={TrendingUp}
          />
          <MetricTile
            title="Draft Opportunities"
            count={isLoading ? 0 : stats?.draft || 0}
            percentage={
              stats?.total ? Math.round((stats.draft / stats.total) * 100) : 0
            }
            icon={FileText}
          />
          <MetricTile
            title="Total Applications"
            count={isLoading ? 0 : stats?.totalApplications || 0}
            percentage={stats?.recentApplications || 0}
            icon={Users}
          />
        </header>
        <section className="flex gap-4">
          <div className="w-[70.3rem] h-138 bg-[#FFFFFF] border border-[#E3E3E3] rounded-2xl p-8">
            <h3 className="text-[2rem] font-degular font-medium">
              Site Visits{" "}
            </h3>
            <SiteVisitChart />
          </div>
          <div className="w-[39.1rem] h-138 bg-[#FFFFFF] border border-[#E3E3E3] rounded-2xl p-8">
            <h3 className="text-[2rem] font-degular font-medium">
              Top Regions{" "}
            </h3>
            <RegionProgress
              name="United States"
              total={44500}
              percentage={65}
            />
            <RegionProgress name="Nigeria" total={4500} percentage={30} />
            <RegionProgress name="United Kingdom" total={400} percentage={25} />
            <RegionProgress name="Canada" total={500} percentage={15} />
          </div>
        </section>
        <section className="flex gap-4">
          <div className="w-[70.3rem] h-[47.8rem] text-[#0F1729] bg-[#FFFFFF] border border-[#E3E3E3] rounded-2xl p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[2rem] font-degular font-medium">
                AI Drafts Pipeline
              </h3>
              <button
                onClick={() => router.push("/x/admin/ai-draft")}
                className="text-[1.2rem] text-blue-600 hover:underline"
              >
                View All
              </button>
            </div>
            {pendingDrafts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No pending drafts
              </div>
            ) : (
              pendingDrafts.map((draft) => (
                <AIDraftCard
                  key={draft.id}
                  title={draft.title}
                  source={draft.crawlSource?.name || "Unknown Source"}
                  date={new Date(draft.createdAt).toLocaleDateString()}
                  status="Pending"
                  onApprove={() => handleApprove(draft.id)}
                  onReject={() => handleReject(draft.id)}
                />
              ))
            )}
          </div>
          <div className="w-[39.1rem] h-[47.8rem] bg-[#FFFFFF] border border-[#E3E3E3] rounded-2xl p-8">
            <h3 className="text-[2rem] font-degular font-medium">
              Recent Activity
            </h3>
            <RecentActivityCard
              title="AI Draft #23 approved by Admin Tolu"
              icon={<CircleCheck className="text-[#21C45D]" />}
              timestamp="2 minutes"
            />
            <RecentActivityCard
              title="AI Draft #23 approved by Admin Tolu"
              icon={<CircleCheck className="text-[#21C45D]" />}
              timestamp="2 minutes"
            />
            <RecentActivityCard
              title="AI Draft #23 approved by Admin Tolu"
              icon={<CircleCheck className="text-[#21C45D]" />}
              timestamp="2 minutes"
            />
            <RecentActivityCard
              title="AI Draft #23 approved by Admin Tolu"
              icon={<CircleCheck className="text-[#21C45D]" />}
              timestamp="2 minutes"
            />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
