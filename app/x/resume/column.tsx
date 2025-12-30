"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";

export const resumeColumns: ColumnDef<any>[] = [
  {
    accessorKey: "resume",
    header: "Resume",
  },
  {
    accessorKey: "jobTitle",
    header: "Job Title",
  },
  {
    accessorKey: "modifiedDate",
    header: "Modified Last",
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
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
