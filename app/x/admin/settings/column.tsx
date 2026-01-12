"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Trash2,
  Play,
  Globe,
  Clock,
  EllipsisVertical,
  Loader2,
} from "lucide-react";
import { useCallback, useState } from "react";
import { CrawlSource } from "@/actions/crawl-sources";
import { useTriggerCrawl, useDeleteCrawlSource } from "@/hooks/useCrawlSources";
import { useToast } from "@/hooks/use-toast";
import { useConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { CrawlEngine } from "@/types/crawl";

export const crawlSourceColumns: ColumnDef<CrawlSource>[] = [
  {
    accessorKey: "name",
    header: "Source Name",
    cell: ({ row }) => {
      const source = row.original;
      return (
        <div className="flex items-center gap-3">
          <Globe className="h-4 w-4 text-blue-600" />
          <div>
            <div className="font-medium text-[1.3rem]">{source.name}</div>
            <div className="text-[1.1rem] text-gray-500 truncate max-w-[200px]">
              {source.url}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
    cell: ({ row }) => {
      const frequency = row.getValue("frequency") as string;
      return (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-[1.2rem] capitalize">{frequency}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColors = {
        ACTIVE: "bg-green-100 text-green-800",
        INACTIVE: "bg-gray-100 text-gray-800",
        ERROR: "bg-red-100 text-red-800",
      };

      return (
        <span
          className={`px-3 py-1 rounded-full text-[1.2rem] font-medium ${
            statusColors[status as keyof typeof statusColors] ||
            statusColors.INACTIVE
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "lastCrawledAt",
    header: "Last Crawled",
    cell: ({ row }) => {
      const lastCrawled = row.getValue("lastCrawledAt") as string | null;
      return (
        <span className="text-[1.2rem] text-gray-600">
          {!lastCrawled ? "Never" : new Date(lastCrawled).toLocaleDateString()}
        </span>
      );
    },
  },
  {
    accessorKey: "opportunitiesFound",
    header: "Opportunities Found",
    cell: ({ row }) => {
      const count = row.getValue("opportunitiesFound") as number;
      return (
        <span className="text-[1.2rem] font-medium text-blue-600">
          {count.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <span className="text-[1.2rem] text-gray-600">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CrawlSourceActionCell source={row.original} />,
  },
];

function CrawlSourceActionCell({ source }: { source: CrawlSource }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [crawlModalOpen, setCrawlModalOpen] = useState(false);
  const [selectedEngine, setSelectedEngine] =
    useState<CrawlEngine>("SCRAPER_DO");

  const { toast } = useToast();
  const triggerCrawl = useTriggerCrawl();
  const deleteCrawlSource = useDeleteCrawlSource();
  const { confirm, dialog } = useConfirmationDialog();

  const isLoading = triggerCrawl.isPending || deleteCrawlSource.isPending;

  /* -------------------------------------------------------------------------- */
  /*                                  HANDLERS                                  */
  /* -------------------------------------------------------------------------- */

  const handleOpenCrawlModal = () => {
    setShowDropdown(false);
    setCrawlModalOpen(true);
  };

  const handleCloseCrawlModal = useCallback(() => {
    setCrawlModalOpen(false);
  }, []);

  const handleEngineChange = useCallback(
    (engine: "SCRAPER_DO" | "CHEERIO" | "PLAYWRIGHT") => {
      setSelectedEngine(engine);
    },
    []
  );

  const handleCrawlSubmit = async () => {
    try {
      const result = await triggerCrawl.mutateAsync({
        id: source.id,
        engine: selectedEngine,
      });

      toast({
        title: "Crawl Started",
        description: `Successfully crawled ${
          result.data?.opportunitiesCreated ?? 0
        } opportunities`,
      });

      setCrawlModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to trigger crawl",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    setShowDropdown(false);

    const confirmed = await confirm({
      title: "Delete Crawl Source",
      description: `Are you sure you want to delete "${source.name}"? This action cannot be undone.`,
      confirmText: "Delete",
      variant: "destructive",
    });

    if (!confirmed) return;

    try {
      await deleteCrawlSource.mutateAsync(source.id);
      toast({
        title: "Success",
        description: "Crawl source deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete crawl source",
        variant: "destructive",
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="relative text-[#0F1729]">
      {dialog}

      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="bg-[#E3E3E333]  h-12 w-12 rounded-full grid place-items-center hover:bg-gray-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <EllipsisVertical />
        )}
      </button>

      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-0"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px]">
            <button
              onClick={handleOpenCrawlModal}
              className="block w-full text-left px-5 py-3 hover:bg-gray-100 text-[1.2rem]"
              disabled={isLoading}
            >
              <Play className="inline h-4 w-4 mr-2" />
              Trigger Crawl
            </button>
            <hr className="border-gray-100" />
            <button
              onClick={handleDelete}
              className="block w-full text-left px-5 py-3 hover:bg-red-50 text-[1.2rem] text-red-600"
              disabled={isLoading}
            >
              <Trash2 className="inline h-4 w-4 mr-2" />
              Delete Source
            </button>
          </div>
        </>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/*                            CRAWL ENGINE MODAL                           */}
      {/* ---------------------------------------------------------------------- */}

      <Modal isOpen={crawlModalOpen} onClose={handleCloseCrawlModal}>
        <div className="w-[500px] text-[#0F1729]">
          <h2 className="text-[2.4rem] font-semibold mb-4">
            Select Crawl Engine
          </h2>

          <p className="text-[1.4rem] text-gray-600 mb-6">
            Choose which crawler engine to use for extracting the details page.
          </p>

          <div className="space-y-4 mb-6">
            {[
              {
                key: "SCRAPER_DO",
                title: "Scraper.do",
                description: "Professional scraping API with proxy rotation",
              },
              {
                key: "CHEERIO",
                title: "Cheerio",
                description: "Fast and lightweight static HTML parser",
              },
              {
                key: "PLAYWRIGHT",
                title: "Playwright",
                description: "Full browser automation for dynamic sites",
              },
            ].map((engine) => (
              <label
                key={engine.key}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="crawlEngine"
                  checked={selectedEngine === engine.key}
                  onChange={() => handleEngineChange(engine.key as any)}
                />
                <div>
                  <p className="text-[1.6rem] font-medium">{engine.title}</p>
                  <p className="text-[1.2rem] text-gray-500">
                    {engine.description}
                  </p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCloseCrawlModal}>
              Cancel
            </Button>
            <Button
              onClick={handleCrawlSubmit}
              className="bg-[#03624C] hover:bg-[#024d3d]"
              disabled={triggerCrawl.isPending}
            >
              {triggerCrawl.isPending ? (
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
    </div>
  );
}
