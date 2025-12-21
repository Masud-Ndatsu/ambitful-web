"use client";
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIDraftCard } from "../dashboard/components/AIDreaftCard";

export default function AdminAIDraftPage() {
  const [tab, setTab] = useState<"New" | "Reviewed">("New");
  return (
    <AdminLayout>
      <section className="">
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
              New {"(2)"}
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
              Reviewed {"(5)"}
            </TabsTrigger>
          </TabsList>
          <TabsContent className="py-12" value="New">
            <section className="bg-white border border-[#E3E3E3] rounded-2xl p-8">
              <h3 className="text-[2.4rem] font-semibold">New AI Drafts</h3>
              <div>
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
                <AIDraftCard
                  title="Software Engineering Internship at TechCorp"
                  source="Indeed"
                  date="2025-10-14"
                  status="Pending"
                  onApprove={() => {}}
                  onReject={() => {}}
                />
              </div>
            </section>
          </TabsContent>
          <TabsContent className="py-12" value="Reviewed">
            <section className="bg-white border border-[#E3E3E3] rounded-2xl p-8">
              <h3 className="text-[2.4rem] font-semibold">Reviewed Drafts</h3>
              <div>
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
                <AIDraftCard
                  title="Software Engineering Internship at TechCorp"
                  source="Indeed"
                  date="2025-10-14"
                  status="Pending"
                  onApprove={() => {}}
                  onReject={() => {}}
                />
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </section>
    </AdminLayout>
  );
}
