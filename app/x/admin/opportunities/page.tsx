"use client";
import { Button } from "@/components/ui/button";
import { Download, Funnel, Plus } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { Modal } from "@/components/Modal";
import CreateOpportunityForm from "./components/CreateOpportunityForm";
import { useMemo, useState, useCallback } from "react";
import ExportContent from "./components/ExportOpportunity";
import FilterOpportunity from "./components/FilterOpportunity";
import { opportunityColumns } from "./column";
import { useAdminOpportunities } from "@/hooks/useOpportunities";
import { AdminRoute } from "@/components/ProtectedRoute";
import { AdminTopBar } from "../../components/AdminTopBar";

export default function AdminOpportunitiesPage() {
  const [showOpportunityModal, setShowOpportunityModal] =
    useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [filters] = useState({});

  const { data: opportunitiesData, isLoading } = useAdminOpportunities(filters);

  console.log({ opportunitiesData });

  const columns = useMemo(() => opportunityColumns, []);

  const transformedData = useMemo(() => {
    if (isLoading) return [];
    return opportunitiesData?.opportunities || [];
  }, [opportunitiesData, isLoading]);

  const handleFilterModal = useCallback(() => {
    setShowFilterModal(!showFilterModal);
  }, [showFilterModal]);

  const handleExportModal = useCallback(() => {
    setShowExportModal(!showExportModal);
  }, [showExportModal]);

  const handleOpportunityModal = useCallback(() => {
    setShowOpportunityModal(!showOpportunityModal);
  }, [showOpportunityModal]);

  return (
    <AdminRoute>
      <main className="h-full flex flex-col overflow-hidden">
        <AdminTopBar />
        <div className="h-full flex flex-col overflow-y-scroll">
          <section className="p-8 pb-20">
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
          bg-[#FFFFFF]! border border-[#E3E3E3] 
          text-[1.6rem] font-semibold tracking-[-3%] 
          text-[#65758B] rounded-2xl gap-4"
                  onClick={handleFilterModal}
                >
                  <Funnel className="h-[1.2rem]! w-[1.2rem]! text-[#000000]!" />
                  Filter
                </Button>
                <Button
                  className="
          bg-[#FFFFFF]! border border-[#E3E3E3] 
          text-[1.6rem] font-semibold tracking-[-3%] 
          text-[#65758B] rounded-2xl gap-4"
                  onClick={handleExportModal}
                >
                  <Download className="h-[1.2rem]! w-[1.2rem]!" />
                  Export
                </Button>
                <Button
                  className="
            bg-[#03624C]! border border-[#E3E3E3] 
          text-[1.6rem] font-semibold tracking-[-3%] 
          text-[#ffffff] rounded-2xl gap-4"
                  onClick={handleOpportunityModal}
                >
                  <Plus className="h-[1.2rem]! w-[1.2rem]!" />
                  Add Opportunity
                </Button>
              </div>
            </header>
            <section className="text-[#000000] py-12">
              <DataTable
                columns={columns}
                data={transformedData}
                isLoading={isLoading}
              />
            </section>
            <Modal
              isOpen={showOpportunityModal}
              onClose={handleOpportunityModal}
            >
              <CreateOpportunityForm onClose={handleOpportunityModal} />
            </Modal>
            <Modal isOpen={showExportModal} onClose={handleExportModal}>
              <ExportContent onClose={handleExportModal} />
            </Modal>
            <Modal isOpen={showFilterModal} onClose={handleFilterModal}>
              <FilterOpportunity onClose={handleFilterModal} />
            </Modal>
          </section>
        </div>
      </main>
    </AdminRoute>
  );
}
