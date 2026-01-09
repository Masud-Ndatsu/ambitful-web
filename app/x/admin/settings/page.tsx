"use client";
import { Button } from "@/components/ui/button";
import AdminLayout from "../../components/AdminLayout";
import { Plus } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { useState } from "react";
import { Modal } from "@/components/Modal";
import AddCrawlSourceForm from "./components/AddCrawlSourceForm";
import { crawlSourceColumns } from "./column";
import { useCrawlSources, useCreateCrawlSource } from "@/hooks/useCrawlSources";
import { CreateCrawlSourceData } from "@/actions/crawl-sources";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettingsPage() {
  const [showCrawlModal, setShowCrawlModal] = useState<boolean>(false);
  const { toast } = useToast();

  // Fetch crawl sources
  const { data, isLoading } = useCrawlSources({ page: 1, limit: 100 });
  const createCrawlSource = useCreateCrawlSource();

  const handleCreateCrawlSource = async (formData: {
    sourceName: string;
    sourceLink: string;
    crawlFrequency: "daily" | "weekly" | "monthly";
    cssSelectors?: string;
  }) => {
    try {
      // Map form data to API format
      const apiData: CreateCrawlSourceData = {
        name: formData.sourceName,
        url: formData.sourceLink,
        frequency: formData.crawlFrequency.toUpperCase() as
          | "DAILY"
          | "WEEKLY"
          | "MONTHLY",
        cssSelectors: formData.cssSelectors,
      };

      await createCrawlSource.mutateAsync(apiData);

      toast({
        title: "Success",
        description: "Crawl source created successfully",
      });

      setShowCrawlModal(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create crawl source",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 max-h-screen overflow-y-scroll scroll-smooth">
        <header className="flex items-center justify-between bg-white border border-b-0 p-8 border-[#E3E3E3] rounded-t-4xl">
          <div>
            <h1 className="text-[2.134rem] leading-[2.561rem] font-semibold">
              Crawl Sources{" "}
            </h1>
            <p className="text-muted-foreground text-[1.138rem] leading-[1.707rem] font-normal">
              Manage and monitor your web crawling sources{" "}
            </p>
          </div>
          <Button
            className="
            bg-[#03624C]! border border-[#E3E3E3]
          text-[1.6rem] font-semibold tracking-[-3%]
          text-[#ffffff] rounded-2xl gap-4"
            onClick={() => setShowCrawlModal(!showCrawlModal)}
          >
            <Plus className="h-[1.2rem]! w-[1.2rem]!" />
            Add Source
          </Button>
        </header>
        <section className="border-x border-[#E3E3E3]">
          <DataTable
            columns={crawlSourceColumns}
            data={data?.crawlSources || []}
            isLoading={isLoading}
          />
        </section>
        <Modal
          isOpen={showCrawlModal}
          onClose={() => setShowCrawlModal(!showCrawlModal)}
        >
          <AddCrawlSourceForm
            onClose={() => setShowCrawlModal(!showCrawlModal)}
            onSubmit={handleCreateCrawlSource}
          />
        </Modal>
      </div>
    </AdminLayout>
  );
}
