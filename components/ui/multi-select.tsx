"use client";

import * as React from "react";
import { X, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  maxDisplayed?: number;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
  maxDisplayed = 3,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter((v) => v !== value));
  };

  const displayedItems = selected.slice(0, maxDisplayed);
  const remainingCount = selected.length - maxDisplayed;

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div
        className={cn(
          "flex min-h-14 w-full flex-wrap items-center gap-2 rounded-[0.684rem] border border-[#E3E3E3] bg-white px-[1.867rem] py-4 cursor-pointer transition-colors",
          isOpen && "border-blue-500 ring-1 ring-blue-500"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <span className="text-[#9CA3AF] text-[1.597rem]">{placeholder}</span>
        ) : (
          <>
            {displayedItems.map((value) => {
              const option = options.find((o) => o.value === value);
              return (
                <Badge
                  key={value}
                  variant="secondary"
                  className="bg-[#E7F5E1] text-[#03624C] hover:bg-[#d4edd0] text-[1.2rem] px-3 py-1"
                >
                  {option?.label || value}
                  <button
                    onClick={(e) => handleRemove(value, e)}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Badge>
              );
            })}
            {remainingCount > 0 && (
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-600 text-[1.2rem] px-3 py-1"
              >
                +{remainingCount} more
              </Badge>
            )}
          </>
        )}
        <ChevronDown
          className={cn(
            "ml-auto h-6 w-6 text-gray-400 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-[#E3E3E3] bg-white shadow-lg">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-[#E3E3E3] px-3 py-2 text-[1.4rem] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {filteredOptions.length === 0 ? (
              <div className="py-4 text-center text-[1.4rem] text-gray-500">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-[1.4rem] hover:bg-[#F8F9FC]",
                    selected.includes(option.value) && "bg-[#E7F5E1]"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option.value);
                  }}
                >
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded border",
                      selected.includes(option.value)
                        ? "border-[#03624C] bg-[#03624C]"
                        : "border-gray-300"
                    )}
                  >
                    {selected.includes(option.value) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className="text-[#0F1729]">{option.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
