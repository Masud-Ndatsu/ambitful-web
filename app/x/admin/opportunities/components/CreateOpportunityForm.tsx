import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOpportunity } from "@/hooks/useOpportunities";
import { useOpportunityTypes } from "@/hooks/useOpportunityTypes";
import {
  createOpportunitySchema,
  CreateOpportunityFormData,
  CreateOpportunityApiData,
} from "@/validations";

type Props = {
  onClose?: () => void;
  onSubmit?: (data: CreateOpportunityFormData) => Promise<void> | void;
};

const CreateOpportunityForm = ({ onClose, onSubmit }: Props) => {
  const [step, setStep] = useState(1);
  const createOpportunityMutation = useCreateOpportunity();
  const { data: opportunityTypes, isLoading: typesLoading } =
    useOpportunityTypes();
  const isLoading = createOpportunityMutation.isPending;

  console.log({ opportunityTypes: opportunityTypes });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateOpportunityFormData>({
    resolver: zodResolver(createOpportunitySchema),
    defaultValues: {
      title: "",
      organization: "",
      description: "",
      deadline: "",
      applicationUrl: "",
      opportunityTypeIds: "",
      compensation: "",
      experienceLevel: "",
      isRemote: false,
    },
  } as any);

  const onFormSubmit = useCallback(
    async (data: CreateOpportunityFormData) => {
      try {
        const transformedData: CreateOpportunityApiData = {
          ...data,
          deadline: new Date(data.deadline).toISOString(),
          applicationUrl:
            data.applicationUrl && data.applicationUrl.trim() !== ""
              ? data.applicationUrl
              : undefined,
          locations: data.locations
            ? data.locations.split("\n").filter((r) => r.trim() != "")
            : [],
          requirements: data?.requirements
            ? data?.requirements.split("\n").filter((r) => r.trim() != "")
            : undefined,
          benefits: data.benefits
            ? data.benefits.split("\n").filter((r) => r.trim() != "")
            : undefined,
          opportunityTypeIds: data.opportunityTypeIds
            ? [data.opportunityTypeIds]
            : [],
          isRemote: data.isRemote || false,
        };

        await createOpportunityMutation.mutateAsync(transformedData);

        if (onSubmit) {
          await onSubmit(data);
        }

        reset();
        onClose?.();
      } catch (error) {
        console.error("Error creating opportunity:", error);
      }
    },
    [onSubmit, createOpportunityMutation, reset, onClose]
  );

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit as any)}
      className="text-[#1A1D23] min-w-[81.1rem] w-full"
    >
      <header className="flex justify-between w-full max-w-[75.1rem] mx-auto">
        <div>
          <h2 className="text-[2.134rem] font-bold">Add New Opportunity</h2>
          <p className="text-[1.138rem] text-[#505662]">
            Create a new opportunity for your platform
          </p>
        </div>
        <button type="button" onClick={onClose} disabled={isLoading}>
          <X />
        </button>
      </header>
      <section className="mt-20">
        {step == 1 && (
          <>
            <div className="grid grid-cols-2 gap-4 w-full max-w-[75.1rem] mx-auto">
              <div>
                <label htmlFor="title" className="block text-[1.6rem]">
                  Title *{" "}
                </label>
                <input
                  {...register("title")}
                  type="text"
                  id="title"
                  className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
                  placeholder="e.g., Software Engineering Internship"
                  disabled={isLoading}
                />
                {errors.title && (
                  <p className="text-red-500 text-[1.1rem] mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="organization" className="block text-[1.6rem]">
                  Organization *{" "}
                </label>
                <input
                  {...register("organization")}
                  type="text"
                  id="organization"
                  className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
                  placeholder="e.g., Google, Meta, Microsoft"
                  disabled={isLoading}
                />
                {errors.organization && (
                  <p className="text-red-500 text-[1.1rem] mt-1">
                    {errors.organization.message}
                  </p>
                )}
              </div>
            </div>

            <div className="max-w-[75.1rem] w-full mx-auto mt-8">
              <label
                htmlFor="opportunityTypeIds"
                className="block text-[1.6rem]"
              >
                Opportunity Type *
              </label>
              <select
                {...register("opportunityTypeIds")}
                id="opportunityTypeIds"
                className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
                disabled={isLoading || typesLoading}
              >
                <option className="p-6 text-[1.2rem]" value="">
                  Select Opportunity Type
                </option>
                {opportunityTypes?.map((type) => (
                  <option
                    className="p-6 text-[1.2rem]"
                    key={type.id}
                    value={type.id}
                  >
                    {type.name}
                  </option>
                ))}
              </select>
              {errors.opportunityTypeIds && (
                <p className="text-red-500 text-[1.1rem] mt-1">
                  {errors.opportunityTypeIds.message}
                </p>
              )}
            </div>

            <div className="max-w-[75.1rem] w-full mx-auto mt-8">
              <label htmlFor="description" className="block text-[1.6rem]">
                Description *
              </label>
              <textarea
                {...register("description")}
                id="description"
                className="border border-[#B6BCC9] text-[1.2rem] w-full h-[18.7rem] p-6 resize-none"
                placeholder="Describe the opportunity, requirements, and responsibilities..."
                disabled={isLoading}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-[1.1rem] mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </>
        )}
        {step == 2 && (
          <>
            <div className="grid grid-cols-2 gap-4 w-full max-w-[75.1rem] mx-auto mt-8">
              <div>
                <label htmlFor="deadline" className="block text-[1.6rem]">
                  Deadline *{" "}
                </label>
                <input
                  {...register("deadline")}
                  type="datetime-local"
                  id="deadline"
                  className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
                  disabled={isLoading}
                />
                {errors.deadline && (
                  <p className="text-red-500 text-[1.1rem] mt-1">
                    {errors.deadline.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="applicationUrl" className="block text-[1.6rem]">
                  Application Link{" "}
                </label>
                <input
                  {...register("applicationUrl")}
                  type="url"
                  id="applicationUrl"
                  className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
                  placeholder="https://..."
                  disabled={isLoading}
                />
                {errors.applicationUrl && (
                  <p className="text-red-500 text-[1.1rem] mt-1">
                    {errors.applicationUrl.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-[75.1rem] mx-auto mt-8">
              <div>
                <label htmlFor="locations" className="block text-[1.6rem]">
                  Location *{" "}
                </label>
                <input
                  {...register("locations")}
                  type="text"
                  id="locations"
                  className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
                  placeholder="e.g., New York, NY or Remote"
                  disabled={isLoading}
                />
                {errors.locations && (
                  <p className="text-red-500 text-[1.1rem] mt-1">
                    {errors.locations.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="experienceLevel"
                  className="block text-[1.6rem]"
                >
                  Experience Level{" "}
                </label>
                <select
                  {...register("experienceLevel")}
                  id="experienceLevel"
                  className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
                  disabled={isLoading}
                >
                  <option value="">Select Level</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="executive">Executive</option>
                  <option value="internship">Internship</option>
                </select>
                {errors.experienceLevel && (
                  <p className="text-red-500 text-[1.1rem] mt-1">
                    {errors.experienceLevel.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-[75.1rem] mx-auto mt-8">
              <div>
                <label htmlFor="requirements" className="block text-[1.6rem]">
                  Requirements
                </label>
                <textarea
                  {...register("requirements")}
                  id="requirements"
                  className="border border-[#B6BCC9] text-[1.2rem] w-full h-48 p-6 resize-none"
                  placeholder="Enter each requirement on a new line..."
                  disabled={isLoading}
                ></textarea>
                <p className="text-[#1A1D2380] text-[1.1rem] mt-1">
                  Enter each requirement on a separate line
                </p>
                {errors.requirements && (
                  <p className="text-red-500 text-[1.1rem] mt-1">
                    {errors.requirements.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="benefits" className="block text-[1.6rem]">
                  Benefits
                </label>
                <textarea
                  {...register("benefits")}
                  id="benefits"
                  className="border border-[#B6BCC9] text-[1.2rem] w-full h-48 p-6 resize-none"
                  placeholder="Enter each benefit on a new line..."
                  disabled={isLoading}
                ></textarea>
                <p className="text-[#1A1D2380] text-[1.1rem] mt-1">
                  Enter each benefit on a separate line
                </p>
                {errors.benefits && (
                  <p className="text-red-500 text-[1.1rem] mt-1">
                    {errors.benefits.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-[75.1rem] mx-auto mt-8">
              <div>
                <label htmlFor="compensation" className="block text-[1.6rem]">
                  Compensation{" "}
                </label>
                <input
                  {...register("compensation")}
                  type="text"
                  id="compensation"
                  className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
                  placeholder="e.g., $80,000 - $120,000"
                  disabled={isLoading}
                />
                {errors.compensation && (
                  <p className="text-red-500 text-[1.1rem] mt-1">
                    {errors.compensation.message}
                  </p>
                )}
              </div>
              <div className="flex items-center mt-8">
                <input
                  {...register("isRemote")}
                  type="checkbox"
                  id="isRemote"
                  className="w-5 h-5 mr-3"
                  disabled={isLoading}
                />
                <label htmlFor="isRemote" className="text-[1.4rem]">
                  Remote Work Available
                </label>
              </div>
            </div>
          </>
        )}
      </section>
      <footer className="flex items-end justify-end gap-4 w-full max-w-[75.1rem] mx-auto mt-8">
        {step == 1 ? (
          <Button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="text-[1.8rem] text-black border border-[#E3E3E3] bg-white! rounded-2xl"
          >
            Cancel
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => setStep(1)}
            disabled={isLoading}
            className="text-[1.8rem] text-black border border-[#E3E3E3] bg-white! rounded-2xl"
          >
            Back
          </Button>
        )}
        {step == 1 ? (
          <Button
            type={"button"}
            disabled={isLoading}
            className="text-[1.8rem] border border-[#E3E3E3] bg-[#03624C]! rounded-2xl"
            onClick={() => setStep(2)}
          >
            {"Next"}
          </Button>
        ) : (
          <Button
            type={"submit"}
            loading={isLoading}
            className="text-[1.8rem] border border-[#E3E3E3] bg-[#03624C]! rounded-2xl"
          >
            Create Opportunity
          </Button>
        )}
      </footer>
    </form>
  );
};

export default CreateOpportunityForm;
