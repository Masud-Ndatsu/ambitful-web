import { Briefcase, CircleCheck } from "lucide-react";
import MetricTile from "./components/MetricTile";
import { AIDraftCard } from "./components/AIDreaftCard";
import RecentActivityCard from "./components/RecentActivityCard";
import SiteVisitChart from "./components/SiteVisitChart";
import RegionProgress from "./components/RegionProgress";
import AdminLayout from "../../components/AdminLayout";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="p-8 pb-48 grid gap-8 place-items-center max-h-screen overflow-y-scroll scroll-smooth">
        <header className="flex gap-[1.1rem]">
          <MetricTile
            title="Total Opportunities"
            count={1224}
            percentage={1.25}
            icon={Briefcase}
          />
          <MetricTile
            title="Total Site Visits"
            count={1224}
            percentage={85}
            icon={Briefcase}
          />
          <MetricTile
            title="Pending AI Drafts"
            count={1224}
            percentage={1.25}
            icon={Briefcase}
          />
          <MetricTile
            title="Avg. Engagement Rate"
            count={1224}
            percentage={1.25}
            icon={Briefcase}
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
            <h3 className="text-[2rem] font-degular font-medium">
              AI Drafts Pipeline
            </h3>
            <AIDraftCard
              title="Software Engineering Internship at TechCorp"
              source="Indeed"
              date="2025-10-14"
              status="Pending"
              onApprove={() => {}}
              onReject={() => {}}
            />
            <AIDraftCard
              title="Software Engineering Internship at TechCorp"
              source="Indeed"
              date="2025-10-14"
              status="Pending"
              onApprove={() => {}}
              onReject={() => {}}
            />
            <AIDraftCard
              title="Software Engineering Internship at TechCorp"
              source="Indeed"
              date="2025-10-14"
              status="Pending"
              onApprove={() => {}}
              onReject={() => {}}
            />
            <AIDraftCard
              title="Software Engineering Internship at TechCorp"
              source="Indeed"
              date="2025-10-14"
              status="Pending"
              onApprove={() => {}}
              onReject={() => {}}
            />
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
