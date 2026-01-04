"use client";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useOpportunityTypes } from "@/hooks/useOpportunityTypes";
import { Filter, X, Briefcase } from "lucide-react";
import { OpportunityType } from "@/types/opportunity";

export interface FilterOptions {
  selectedTypes: string[];
}

interface OpportunityFilterProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearAll: () => void;
}

export default function OpportunityFilter({
  filters,
  onFiltersChange,
  onClearAll,
}: OpportunityFilterProps) {
  const { data: opportunityTypes = [], isLoading: isTypesLoading } = useOpportunityTypes();

  // Toggle opportunity type selection
  const toggleType = useCallback((typeId: string) => {
    const newSelectedTypes = filters.selectedTypes.includes(typeId)
      ? filters.selectedTypes.filter(id => id !== typeId)
      : [...filters.selectedTypes, typeId];
    
    onFiltersChange({ selectedTypes: newSelectedTypes });
  }, [filters.selectedTypes, onFiltersChange]);

  // Count active filters
  const activeFilterCount = filters.selectedTypes.length;

  return (
    <div className="bg-white rounded-2xl border border-[#E3E3E3] p-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-[#505662]" />
          <h3 className="text-[1.6rem] font-semibold text-[#1A1D23]">
            Filter by Type
          </h3>
          {activeFilterCount > 0 && (
            <span className="bg-[#03624C] text-white text-[1.2rem] px-2 py-1 rounded-full min-w-[2.4rem] text-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            onClick={onClearAll}
            className="text-[1.2rem] text-[#505662] hover:text-[#1A1D23]"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Opportunity Types */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-4 w-4 text-[#505662]" />
          <h4 className="text-[1.4rem] font-medium text-[#1A1D23]">
            Opportunity Types
          </h4>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {isTypesLoading ? (
            [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-200 rounded-lg animate-pulse"
              />
            ))
          ) : (
            opportunityTypes.map((type: OpportunityType) => (
              <button
                key={type.id}
                onClick={() => toggleType(type.id)}
                className={`p-3 rounded-lg border text-[1.2rem] font-medium transition-all duration-200 hover:scale-105 ${
                  filters.selectedTypes.includes(type.id)
                    ? 'bg-[#03624C] text-white border-[#03624C] shadow-md'
                    : 'bg-white text-[#505662] border-[#E3E3E3] hover:border-[#03624C] hover:text-[#03624C]'
                }`}
              >
                {type.name}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Selected Filters Display */}
      {activeFilterCount > 0 && (
        <div className="mt-6 pt-6 border-t border-[#E3E3E3]">
          <h5 className="text-[1.2rem] font-medium text-[#1A1D23] mb-3">
            Selected Types ({activeFilterCount})
          </h5>
          <div className="flex flex-wrap gap-2">
            {filters.selectedTypes.map(typeId => {
              const type = opportunityTypes.find(t => t.id === typeId);
              return type ? (
                <FilterTag
                  key={typeId}
                  label={type.name}
                  onRemove={() => toggleType(typeId)}
                />
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isTypesLoading && opportunityTypes.length === 0 && (
        <div className="text-center py-8">
          <Briefcase className="h-12 w-12 text-[#E3E3E3] mx-auto mb-3" />
          <p className="text-[1.4rem] text-[#505662]">
            No opportunity types available
          </p>
        </div>
      )}
    </div>
  );
}

interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

function FilterTag({ label, onRemove }: FilterTagProps) {
  return (
    <span className="inline-flex items-center gap-2 bg-[#03624C] text-white text-[1.1rem] px-3 py-1 rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-white hover:text-[#03624C] rounded-full p-0.5 transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}