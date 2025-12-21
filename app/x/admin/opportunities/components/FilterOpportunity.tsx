import { X } from "lucide-react";
import React, { useState } from "react";

/**
 * Allowed status filter
 */
type FilterStatusType = "Title" | "Status" | "Category";

/**
 * Exportable field names
 */
type FilterCategoriesType =
  | "Title"
  | "Category"
  | "Status"
  | "Date"
  | "Author"
  | "Clicks";

/**
 * Props interface
 */
interface OpportunityFilterProps<T = unknown> {
  onClose: () => void;
  data?: T[];
}

export default function FilterOpportunity({ onClose }: OpportunityFilterProps) {
  const [filterStatus, setFilterStatus] = useState<FilterStatusType>("Title");
  const [selectedCategories, setSelectedCategories] = useState<
    FilterCategoriesType[]
  >(["Title", "Category", "Status", "Date", "Author", "Clicks"]);

  const filterStatuses: FilterStatusType[] = ["Title", "Category", "Status"];

  const allCategories: FilterCategoriesType[] = [
    "Title",
    "Category",
    "Status",
    "Date",
    "Author",
    "Clicks",
  ];

  const handleFieldToggle = (field: FilterCategoriesType): void => {
    setSelectedCategories((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  // const handleSelectAll = (): void => {
  //   setSelectedCategories((prev) =>
  //     prev.length === allCategories.length ? [] : [...allCategories]
  //   );
  // };

  const handleFilter = (): void => {
    console.log("Filtering data:", {
      filterStatuses,
      allCategories,
      //   data,
    });

    alert(
      `Filtered as ${filterStatus} with ${allCategories.length} fields selected.`
    );

    // onClose();
  };

  return (
    <div className="min-w-[48.7rem] h-[63.2rem] text-[1.6rem] text-[#1A1D23]">
      <header className="flex justify-between">
        <div>
          <h2 className="text-[2.134rem] font-bold">Filter Opportunities</h2>
          <p className="text-[1.138rem] text-[#505662]">
            Refine your search with filters{" "}
          </p>
        </div>
        <button>
          <X />
        </button>
      </header>

      {/* Content */}
      <div className="py-4">
        {/* Categories */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[1.6rem] font-medium text-gray-700">
              Categories{" "}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {allCategories.map((category) => (
              <label
                key={category}
                className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleFieldToggle(category)}
                  className="w-8 h-8 text-[#03624C]! border-gray-300 rounded cursor-pointer"
                />
                <span className="ml-3 text-[1.6rem] text-gray-700">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mt-10">
          <h3 className="text-[1.6rem] font-medium text-gray-700 mb-3">
            Status{" "}
          </h3>

          <div className="">
            {filterStatuses.map((format) => (
              <label key={format} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="exportFormat"
                  value={format}
                  checked={filterStatus === format}
                  onChange={(e) =>
                    setFilterStatus(e.target.value as FilterStatusType)
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

        <div className="grid grid-cols-2 gap-4 w-full max-w-[75.1rem] mx-auto mt-8">
          <div>
            <label htmlFor="date" className="block text-[1.6rem]">
              Date Range{" "}
            </label>
            <input
              type="text"
              name="date"
              className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
              placeholder="dd/mm/yyyy"
            />
          </div>
          <div className="self-end">
            <input
              type="text"
              name="date"
              className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
              placeholder="dd/mm/yyyy"
            />
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="px-6 py-4">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[1.8rem] font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleFilter}
            disabled={selectedCategories.length === 0}
            className={`px-8 py-4 text-[1.8rem] font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
              selectedCategories.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#03624C] hover:bg-[#03624C]/70"
            }`}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
