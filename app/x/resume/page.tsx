"use client";
import React, { useMemo } from "react";
import { TopBar } from "../components/TopBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "../components/DataTable";
import { resumeColumns } from "./column";

export default function ResumePage() {
  // const [showUploadModal, setShowUploadModal] = useState(false);
  const columns = useMemo(() => resumeColumns, []);
  return (
    <main>
      <TopBar />
      <section className="p-8">
        <header className="flex items-end justify-end">
          <Button
            className="
            bg-[#03624C]! border border-[#E3E3E3] 
          text-[1.6rem] font-semibold tracking-[-3%] 
          text-[#ffffff] rounded-2xl gap-4"
          >
            <Plus className="h-[1.2rem]! w-[1.2rem]!" />
            Upload Resume
          </Button>
        </header>
        <section className="py-8">
          <DataTable columns={columns} data={[]} />
        </section>
      </section>
      {/* <Model></Model> */}
    </main>
  );
}
