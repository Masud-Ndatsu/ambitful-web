"use client";
import { Button } from "@/components/ui/button";
import AdminLayout from "../../components/AdminLayout";
import { Download, Funnel, Plus } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { Modal } from "@/components/Modal";
import CreateOpportunityForm from "./components/CreateOpportunityForm";
import { useMemo, useState } from "react";
import ExportContent from "./components/ExportOpportunity";
import FilterOpportunity from "./components/FilterOpportunity";
import { AdminOpportunity } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";

const opportunityColumns: ColumnDef<AdminOpportunity>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    accessorKey: "dateAdded",
    header: "Date Added",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => (
      <div className="bg-[#E3E3E333] h-12 w-12 rounded-full grid place-items-center">
        <EllipsisVertical />
      </div>
    ),
  },
];
const opportunities: AdminOpportunity[] = [
  {
    id: "opp_001",
    title: "Google Software Engineering Internship",
    category: "Internship",
    author: "Admin Team",
    clicks: 342,
    dateAdded: "2025-01-12",
    status: "published",
  },
  {
    id: "opp_002",
    title: "Meta Product Design Fellowship",
    category: "Fellowship",
    author: "Jane Doe",
    clicks: 198,
    dateAdded: "2025-01-08",
    status: "published",
  },
  {
    id: "opp_003",
    title: "AI Research Grant for African Startups",
    category: "Grant",
    author: "Opportunities Desk",
    clicks: 87,
    dateAdded: "2024-12-28",
    status: "draft",
  },
  {
    id: "opp_004",
    title: "Remote Frontend Engineer Role",
    category: "Job",
    author: "Admin Team",
    clicks: 421,
    dateAdded: "2024-12-20",
    status: "archived",
  },
];

export default function AdminOpportunitiesPage() {
  const [isOpportunityModal, setIsOpportunityModal] = useState<boolean>(false);
  const [isExportModal, setIsExportModal] = useState<boolean>(false);
  const [isFilterModal, setIsFilterModal] = useState<boolean>(false);
  const [data] = useState(() => opportunities);
  const columns = useMemo(() => opportunityColumns, []);

  return (
    <AdminLayout>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-[2.134rem] leading-[2.561rem] font-semibold">
            Opportunity Performance
          </h1>
          <p className="text-muted-foreground text-[1.138rem] leading-[1.707rem] font-normal">
            Track engagement and manage opportunities
          </p>
        </div>
        <div className="flex gap-4">
          {" "}
          <Button
            className="
          bg-[#FFFFFF] border border-[#E3E3E3] 
          text-[1.6rem] font-semibold tracking-[-3%] 
          text-[#65758B] rounded-2xl gap-4"
            onClick={() => setIsFilterModal(!isFilterModal)}
          >
            <Funnel className="h-[1.2rem]! w-[1.2rem]! text-[#000000]!" />
            Filter
          </Button>
          <Button
            className="
          bg-[#FFFFFF] border border-[#E3E3E3] 
          text-[1.6rem] font-semibold tracking-[-3%] 
          text-[#65758B] rounded-2xl gap-4"
            onClick={() => setIsExportModal(!isExportModal)}
          >
            <Download className="h-[1.2rem]! w-[1.2rem]!" />
            Export
          </Button>
          <Button
            className="
            bg-[#03624C] border border-[#E3E3E3] 
          text-[1.6rem] font-semibold tracking-[-3%] 
          text-[#ffffff] rounded-2xl gap-4"
            onClick={() => setIsOpportunityModal(!isOpportunityModal)}
          >
            <Plus className="h-[1.2rem]! w-[1.2rem]!" />
            Add Opportunity
          </Button>
        </div>
      </header>
      <section className="text-[#000000] py-12">
        <DataTable columns={columns} data={data} />
      </section>
      <Modal
        isOpen={isOpportunityModal}
        onClose={() => setIsOpportunityModal(!isOpportunityModal)}
      >
        <CreateOpportunityForm />
      </Modal>
      <Modal
        isOpen={isExportModal}
        onClose={() => setIsExportModal(!isExportModal)}
      >
        <ExportContent onClose={() => setIsExportModal(!isExportModal)} />
      </Modal>
      <Modal
        isOpen={isFilterModal}
        onClose={() => setIsFilterModal(!isFilterModal)}
      >
        <FilterOpportunity onClose={() => setIsFilterModal(!isFilterModal)} />
      </Modal>
    </AdminLayout>
  );
}
