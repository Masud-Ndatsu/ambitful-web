/* eslint-disable react-hooks/incompatible-library */
"use client";

import { AdminOpportunity } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";

export const opportunityColumns: ColumnDef<AdminOpportunity>[] = [
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
