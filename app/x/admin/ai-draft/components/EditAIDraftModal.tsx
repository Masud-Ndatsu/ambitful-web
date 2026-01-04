"use client";

import { useState, useEffect, useMemo } from "react";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useAIDraftById, useUpdateAIDraft } from "@/hooks/useAIDrafts";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface EditAIDraftModalProps {
  draftId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditAIDraftModal({
  draftId,
  isOpen,
  onClose,
}: EditAIDraftModalProps) {
  const { data: draftData, isLoading } = useAIDraftById(draftId);
  const updateMutation = useUpdateAIDraft();
  const { toast } = useToast();

  const draft = draftData?.data;

  // Form state with memoized initial values
  const initialFormData = useMemo(() => ({
    title: draft?.title || "",
    organization: draft?.organization || "",
    description: draft?.description || "",
    requirements: draft?.requirements || [] as string[],
    benefits: draft?.benefits || [] as string[],
    compensation: draft?.compensation || "",
    compensationType: draft?.compensationType || "",
    locations: draft?.locations || [] as string[],
    isRemote: draft?.isRemote || false,
    deadline: draft?.deadline ? new Date(draft.deadline).toISOString().slice(0, 16) : "",
    applicationUrl: draft?.applicationUrl || "",
    contactEmail: draft?.contactEmail || "",
    experienceLevel: draft?.experienceLevel || "",
    duration: draft?.duration || "",
    eligibility: draft?.eligibility || [] as string[],
  }), [draft]);

  const [formData, setFormData] = useState(initialFormData);

  // Update form data when draft changes
  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field: string, value: string) => {
    const items = value.split("\n").filter((item) => item.trim() !== "");
    setFormData((prev) => ({
      ...prev,
      [field]: items,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateData = {
      ...formData,
      deadline: formData.deadline ? new Date(formData.deadline).toISOString() : undefined,
    };

    updateMutation.mutate(
      { id: draftId, data: updateData },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "AI Draft updated successfully",
          });
          onClose();
        },
        onError: () => {
          toast({
            title: "Error", 
            description: "Failed to update AI Draft",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[800px] max-h-[80vh] overflow-y-auto bg-white">
        <div className="p-6">
          <h2 className="text-[2.4rem] font-semibold mb-6 text-[#0F1729]">Edit AI Draft</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Organization */}
            <div>
              <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                Organization *
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => handleInputChange("organization", e.target.value)}
                className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] h-32 bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                Requirements (one per line)
              </label>
              <textarea
                value={formData.requirements.join("\n")}
                onChange={(e) => handleArrayChange("requirements", e.target.value)}
                className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] h-24 bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter requirements, one per line"
              />
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                Benefits (one per line)
              </label>
              <textarea
                value={formData.benefits.join("\n")}
                onChange={(e) => handleArrayChange("benefits", e.target.value)}
                className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] h-24 bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter benefits, one per line"
              />
            </div>

            {/* Row with Compensation and Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                  Compensation
                </label>
                <input
                  type="text"
                  value={formData.compensation}
                  onChange={(e) => handleInputChange("compensation", e.target.value)}
                  className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g., $50,000 - $70,000"
                />
              </div>
              <div>
                <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                  Compensation Type
                </label>
                <select
                  value={formData.compensationType}
                  onChange={(e) => handleInputChange("compensationType", e.target.value)}
                  className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="salary">Salary</option>
                  <option value="stipend">Stipend</option>
                  <option value="scholarship_amount">Scholarship</option>
                  <option value="hourly">Hourly</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
            </div>

            {/* Locations */}
            <div>
              <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                Locations (one per line)
              </label>
              <textarea
                value={formData.locations.join("\n")}
                onChange={(e) => handleArrayChange("locations", e.target.value)}
                className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] h-20 bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter locations, one per line"
              />
            </div>

            {/* Remote checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isRemote"
                checked={formData.isRemote}
                onChange={(e) => handleInputChange("isRemote", e.target.checked)}
                className="mr-3 w-4 h-4"
              />
              <label htmlFor="isRemote" className="text-[1.4rem] font-medium text-[#0F1729]">
                Remote position
              </label>
            </div>

            {/* Row with Deadline and Experience Level */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                  Deadline
                </label>
                <input
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange("deadline", e.target.value)}
                  className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                  Experience Level
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                  className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select level</option>
                  <option value="entry">Entry</option>
                  <option value="mid">Mid</option>
                  <option value="senior">Senior</option>
                  <option value="executive">Executive</option>
                  <option value="internship">Internship</option>
                  <option value="any">Any</option>
                </select>
              </div>
            </div>

            {/* Row with Application URL and Contact Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                  Application URL
                </label>
                <input
                  type="url"
                  value={formData.applicationUrl}
                  onChange={(e) => handleInputChange("applicationUrl", e.target.value)}
                  className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="https://example.com/apply"
                />
              </div>
              <div>
                <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="contact@example.com"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., 3 months, Full-time, Part-time"
              />
            </div>

            {/* Eligibility */}
            <div>
              <label className="block text-[1.4rem] font-medium mb-2 text-[#0F1729]">
                Eligibility (one per line)
              </label>
              <textarea
                value={formData.eligibility.join("\n")}
                onChange={(e) => handleArrayChange("eligibility", e.target.value)}
                className="w-full p-3 border border-[#E3E3E3] rounded-xl text-[1.4rem] h-20 bg-white text-[#0F1729] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter eligibility criteria, one per line"
              />
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-[#E3E3E3]">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="text-[1.4rem] px-6 py-3 rounded-xl !bg-white border-[#E3E3E3] text-[#0F1729] hover:!bg-[#F8F9FC]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="text-[1.4rem] px-6 py-3 rounded-xl !bg-blue-600 hover:!bg-blue-700 text-white border-none"
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Draft"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}