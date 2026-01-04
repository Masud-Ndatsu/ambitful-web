"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, FileText } from "lucide-react";

export const resumeColumns: ColumnDef<any>[] = [
  {
    accessorKey: "resume",
    header: () => (
      <span className="text-[1.4rem] font-medium text-[#505662]">Resume</span>
    ),
    cell: ({ row }) => {
      const resumeName = row.getValue("resume") as string;
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#03624C] rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-[1.4rem] font-medium text-[#0F1729]">
            {resumeName?.length > 50 ? `${resumeName.substring(0, 50)}...` : resumeName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "jobTitle",
    header: () => (
      <span className="text-[1.4rem] font-medium text-[#505662]">Job Title</span>
    ),
    cell: ({ row }) => {
      const jobTitle = row.getValue("jobTitle") as string;
      return (
        <span className="text-[1.4rem] text-[#0F1729]">
          {jobTitle || "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "modifiedDate",
    header: () => (
      <span className="text-[1.4rem] font-medium text-[#505662]">Modified Last</span>
    ),
    cell: ({ row }) => {
      const date = row.getValue("modifiedDate") as string;
      return (
        <span className="text-[1.4rem] text-[#505662]">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "dateCreated",
    header: () => (
      <span className="text-[1.4rem] font-medium text-[#505662]">Date Created</span>
    ),
    cell: ({ row }) => {
      const date = row.getValue("dateCreated") as string;
      return (
        <span className="text-[1.4rem] text-[#505662]">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => (
      <span className="text-[1.4rem] font-medium text-[#505662]">Action</span>
    ),
    cell: () => (
      <div className="bg-[#F8F9FC] border border-[#E3E3E3] h-10 w-10 rounded-lg grid place-items-center hover:bg-[#E3E3E3] cursor-pointer transition-colors">
        <EllipsisVertical className="h-4 w-4 text-[#505662]" />
      </div>
    ),
  },
];
