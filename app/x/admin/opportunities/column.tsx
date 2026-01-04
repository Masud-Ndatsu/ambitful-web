"use client";

import { AdminOpportunity } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Edit, Trash2, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useDropdownPosition } from "@/hooks/useDropdownPosition";

export const opportunityColumns: ColumnDef<AdminOpportunity>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const truncatedTitle = title.length > 50 ? title.substring(0, 50) + "..." : title;
      return (
        <div className="max-w-[300px]">
          <div 
            className="text-[1.4rem] font-medium" 
            title={title}
          >
            {truncatedTitle}
          </div>
        </div>
      );
    },
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
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColors = {
        published: "bg-green-100 text-green-800",
        draft: "bg-yellow-100 text-yellow-800",
        archived: "bg-gray-100 text-gray-800",
      };

      return (
        <span
          className={`px-3 py-1 rounded-full text-[1.2rem] font-medium ${
            statusColors[status as keyof typeof statusColors] ||
            statusColors.draft
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <OpportunityActionCell opportunity={row.original} />,
  },
];

function OpportunityActionCell({ opportunity }: { opportunity: AdminOpportunity }) {
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Use custom hook to handle dropdown positioning
  const { buttonRef, positionClasses } = useDropdownPosition({ 
    isOpen: showDropdown 
  });

      const handleView = () => {
        console.log("View opportunity:", opportunity.id);
        setShowDropdown(false);
      };

      const handleEdit = () => {
        console.log("Edit opportunity:", opportunity.id);
        setShowDropdown(false);
      };

      const handleDelete = () => {
        console.log("Delete opportunity:", opportunity.id);
        setShowDropdown(false);
      };

      return (
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-[#E3E3E333] h-12 w-12 rounded-full grid place-items-center hover:bg-gray-200"
          >
            <EllipsisVertical />
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
                  onClick={handleView}
                  className="block w-full text-left px-5 py-3 hover:bg-gray-100 text-[1.2rem] whitespace-nowrap"
                >
                  <Eye className="inline h-4 w-4 mr-2" />
                  View Details
                </button>
                <hr className="border-gray-100" />
                <button
                  onClick={handleEdit}
                  className="block w-full text-left px-5 py-3 hover:bg-gray-100 text-[1.2rem] whitespace-nowrap"
                >
                  <Edit className="inline h-4 w-4 mr-2" />
                  Edit Opportunity
                </button>
                <hr className="border-gray-100" />
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-5 py-3 hover:bg-red-50 text-[1.2rem] text-red-600 whitespace-nowrap"
                >
                  <Trash2 className="inline h-4 w-4 mr-2" />
                  Delete Opportunity
                </button>
              </div>
            </>
          )}
        </div>
      );
}
export const opportunities: AdminOpportunity[] = [
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
