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
import { useState } from "react";
import { CrawlSource } from "@/actions/crawl-sources";
import { useTriggerCrawl, useDeleteCrawlSource } from "@/hooks/useCrawlSources";
import { useToast } from "@/hooks/use-toast";
import { useDropdownPosition } from "@/hooks/useDropdownPosition";
import { useConfirmationDialog } from "@/components/ui/confirmation-dialog";

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
  const { toast } = useToast();
  const triggerCrawl = useTriggerCrawl();
  const deleteCrawlSource = useDeleteCrawlSource();
  const { confirm, dialog } = useConfirmationDialog();
  
  // Use custom hook to handle dropdown positioning
  const { buttonRef, positionClasses } = useDropdownPosition({ 
    isOpen: showDropdown 
  });

      const handleTriggerCrawl = async () => {
        setShowDropdown(false);
        try {
          const result = await triggerCrawl.mutateAsync(source.id);
          toast({
            title: "Crawl Started",
            description: `Successfully crawled ${
              result.data?.opportunitiesCreated || 0
            } opportunities`,
          });
        } catch (error: any) {
          toast({
            title: "Error",
            description: error.message || "Failed to trigger crawl",
            variant: "destructive",
          });
        }
      };

      const handleDelete = async () => {
        setShowDropdown(false);
        confirm({
          title: "Delete Crawl Source",
          description: `Are you sure you want to delete "${source.name}"? This action cannot be undone.`,
          onConfirm: async () => {
            try {
              await deleteCrawlSource.mutateAsync(source.id);
              toast({
                title: "Success",
                description: "Crawl source deleted successfully",
              });
            } catch (error: any) {
              toast({
                title: "Error",
                description: error.message || "Failed to delete crawl source",
                variant: "destructive",
              });
            }
          },
          confirmText: "Delete",
          variant: "destructive"
        });
      };

      const isLoading = triggerCrawl.isPending || deleteCrawlSource.isPending;

      return (
        <div className="relative">
          {dialog}
          <button
            ref={buttonRef}
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-[#E3E3E333] h-12 w-12 rounded-full grid place-items-center hover:bg-gray-200"
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
              {/* Backdrop to close dropdown when clicked outside */}
              <div 
                className="fixed inset-0 z-0" 
                onClick={() => setShowDropdown(false)}
              />
              <div className={`absolute right-0 ${positionClasses} bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px] max-w-[200px]`}>
                <button
                  onClick={handleTriggerCrawl}
                  className="block w-full text-left px-5 py-3 hover:bg-gray-100 text-[1.2rem] whitespace-nowrap"
                  disabled={isLoading}
                >
                  <Play className="inline h-4 w-4 mr-2" />
                  Trigger Crawl
                </button>
                <hr className="border-gray-100" />
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-5 py-3 hover:bg-red-50 text-[1.2rem] text-red-600 whitespace-nowrap"
                  disabled={isLoading}
                >
                  <Trash2 className="inline h-4 w-4 mr-2" />
                  Delete Source
                </button>
              </div>
            </>
          )}
        </div>
      );
}
