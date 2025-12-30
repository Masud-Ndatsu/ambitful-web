"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * Allowed export formats
 */
type ExportFormat = "CSV" | "PDF" | "Excel";

/**
 * Exportable field names
 */
type ExportField =
  | "Title"
  | "Category"
  | "Status"
  | "Date"
  | "Author"
  | "Clicks";

/**
 * Props interface
 */
interface ExportContentProps<T = unknown> {
  onClose: () => void;
  data?: T[];
}

const ExportContent = <T,>({ onClose, data = [] }: ExportContentProps<T>) => {
  const [exportFormat, setExportFormat] = useState<ExportFormat>("CSV");
  const [selectedFields, setSelectedFields] = useState<ExportField[]>([
    "Title",
    "Category",
    "Status",
    "Date",
    "Author",
    "Clicks",
  ]);
  const { toast } = useToast();

  const formatOptions: ExportFormat[] = ["CSV", "PDF", "Excel"];

  const allFields: ExportField[] = [
    "Title",
    "Category",
    "Status",
    "Date",
    "Author",
    "Clicks",
  ];

  const handleFieldToggle = (field: ExportField): void => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  // const handleSelectAll = (): void => {
  //   setSelectedFields((prev) =>
  //     prev.length === allFields.length ? [] : [...allFields]
  //   );
  // };

  const handleExport = (): void => {
    console.log("Exporting data:", {
      format: exportFormat,
      fields: selectedFields,
      data,
    });

    toast({
      title: "Export Completed",
      description: `Exported as ${exportFormat} with ${selectedFields.length} fields selected.`
    });

    onClose();
  };

  return (
    <div className="min-w-[48.7rem] w-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 mb-6">
        <h2 className="text-[2.134rem] font-semibold text-gray-900">
          Export Opportunities
        </h2>
        <p className="text-[1.138rem] text-gray-500 mt-1">
          Choose format and fields to export
        </p>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        {/* Export Format */}
        <div className="mb-16">
          <h3 className="text-[1.6rem] font-medium text-gray-700 mb-3">
            Export Format
          </h3>

          <div className="">
            {formatOptions.map((format) => (
              <label key={format} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="exportFormat"
                  value={format}
                  checked={exportFormat === format}
                  onChange={(e) =>
                    setExportFormat(e.target.value as ExportFormat)
                  }
                  className="w-8 h-8 bg-[#03624C]! border-gray-300 cursor-pointer"
                />
                <span className="ml-2 text-[1.6rem]  text-gray-700">
                  {format}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Fields */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[1.6rem] font-medium text-gray-700">
              Fields to Include
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {allFields.map((field) => (
              <label
                key={field}
                className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field)}
                  onChange={() => handleFieldToggle(field)}
                  className="w-8 h-8 text-[#03624C]! border-gray-300 rounded cursor-pointer"
                />
                <span className="ml-3 text-[1.6rem] text-gray-700">
                  {field}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[1.6rem] font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleExport}
            disabled={selectedFields.length === 0}
            className={`px-4 py-2 text-[1.6rem] font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
              selectedFields.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportContent;
