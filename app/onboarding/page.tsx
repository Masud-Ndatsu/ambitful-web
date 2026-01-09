"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useCallback, useState, Suspense } from "react";
import Image from "next/image";
import { useSubmitOnboarding } from "@/hooks/useOnboarding";
import { useAuth } from "@/hooks/useAuthentication";
import { useToast } from "@/hooks/use-toast";
import { useOpportunityTypes } from "@/hooks/useOpportunityTypes";
import { useCountries, usePreferredLocations } from "@/hooks/useGeoData";
import {
  JOB_FUNCTIONS,
  WORK_AUTHORIZATION_OPTIONS,
  WorkAuthorization,
} from "@/lib/constants";

interface FormData {
  jobFunction: string;
  country: string;
  remoteWork: boolean;
  workAuthorization: WorkAuthorization;
  resume?: FileList;
}

function OnboardingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") || "1", 10);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedOpportunityTypes, setSelectedOpportunityTypes] = useState<
    string[]
  >([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { user } = useAuth();
  const submitOnboardingMutation = useSubmitOnboarding();
  const { toast } = useToast();
  const { data: opportunityTypesData, isLoading: isLoadingTypes } =
    useOpportunityTypes();

  // Fetch countries and locations from public APIs
  const { data: countriesData } = useCountries();
  const { options: locationOptions } = usePreferredLocations();

  const opportunityTypes = opportunityTypesData || [];

  // Convert countries to select options
  const countryOptions =
    countriesData?.map((country) => ({
      value: country.name,
      label: country.name,
    })) || [];

  const { handleSubmit, setValue, control } = useForm<FormData>({
    defaultValues: {
      remoteWork: false,
    },
  });

  const remoteWork = useWatch({ control, name: "remoteWork" });

  const updateStep = useCallback(
    (newStep: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("step", newStep.toString());
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    if (step < 1 || step > 2 || isNaN(step)) {
      updateStep(1);
    }
  }, [step, updateStep]);

  const onSubmit = async (data: FormData) => {
    if (step === 1) {
      updateStep(2);
    } else {
      // Handle final submission
      const submitData = {
        jobFunction: data.jobFunction,
        opportunityTypeIds: selectedOpportunityTypes,
        preferredLocations: selectedLocations,
        country: data.country,
        remoteWork: data.remoteWork,
        workAuthorization: data.workAuthorization,
        resumeUrl: uploadedFile ? URL.createObjectURL(uploadedFile) : undefined,
      };

      try {
        const response = await submitOnboardingMutation.mutateAsync(submitData);

        if (response.success) {
          // Redirect based on user role
          if (user?.role === "ADMIN" || user?.role === "MODERATOR") {
            router.push("/x/admin/dashboard");
          } else {
            router.push("/x/opportunities");
          }
        } else {
          toast({
            title: "Onboarding Failed",
            description: response.message || "Failed to complete onboarding",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Onboarding submission error:", error);
        toast({
          title: "Error",
          description: "Failed to complete onboarding. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleOpportunityTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedOpportunityTypes((prev) => [...prev, typeId]);
    } else {
      setSelectedOpportunityTypes((prev) => prev.filter((t) => t !== typeId));
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  }, []);

  return (
    <main className="w-full max-w-[65.7rem] mx-auto text-[2rem] bg-white p-4 sm:p-8 lg:p-16">
      <header className="flex items-center justify-center gap-4 py-12">
        <div className="h-[1.14rem] w-[1.14rem] bg-[#03624C] rounded-full"></div>
        <div className="h-[0.228125rem] w-[3.65rem] bg-[#03624C]"></div>
        <div className="h-[1.14rem] w-[1.14rem] border-[0.228rem] border-[#E2E4E9] rounded-full"></div>
        <p className="uppercase">Step {step} of 2</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="">
          {step === 1 ? (
            <>
              <h1 className="font-degular font-semibold text-[3rem] sm:text-[3.5rem] lg:text-[4.106rem] leading-[4.563rem]">
                Let&apos;s personalize your experience
              </h1>
              <p className="text-[1.6rem] sm:text-[1.825rem] leading-[2.738rem] mt-8 mb-12">
                Tell us what you&apos;re looking for
              </p>
              <div className="text-[1.597rem] mb-8">
                <label
                  className="block text-[#344054] uppercase mb-4"
                  htmlFor="jobFunction"
                >
                  Job Function
                </label>
                <Select
                  onValueChange={(value) => setValue("jobFunction", value)}
                >
                  <SelectTrigger className="p-10! px-8! text-[1.6rem] border-[0.133rem] mt-[0.8] rounded-[0.684rem] w-full h-auto bg-white">
                    <SelectValue placeholder="Select your professional field" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_FUNCTIONS.map((jobFunction) => (
                      <SelectItem
                        className="text-[#0F1729] text-[1.6rem] py-8! px-10! bg-white hover:bg-[#F8F9FC]"
                        key={jobFunction}
                        value={jobFunction}
                      >
                        {jobFunction}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[#676F7E] text-[1.6rem] leading-[1.825rem] my-8">
                  Choose the field that best matches your expertise
                </p>
              </div>

              {/* Opportunity Types Selection */}
              <div className="text-[1.597rem] mb-8">
                <label className="block text-[#344054] uppercase mb-4">
                  Opportunity Types
                </label>
                <p className="text-[#676F7E] text-[1.6rem] leading-[1.825rem] mb-4">
                  What types of opportunities are you looking for?
                </p>
                {isLoadingTypes ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-12 bg-gray-200 rounded-lg animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {opportunityTypes.map((type) => (
                      <div
                        key={type.id}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={`opp-type-${type.id}`}
                          className="h-6 w-6"
                          checked={selectedOpportunityTypes.includes(type.id)}
                          onCheckedChange={(checked) =>
                            handleOpportunityTypeChange(
                              type.id,
                              checked as boolean
                            )
                          }
                        />
                        <label
                          htmlFor={`opp-type-${type.id}`}
                          className="text-[1.597rem] text-[#1F242E] cursor-pointer"
                        >
                          {type.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-[#676F7E] text-[1.6rem] leading-[1.825rem] my-8">
                  Select all that interest you
                </p>
              </div>

              <div className="text-[1.597rem] mb-8">
                <label className="block text-[#344054] uppercase mb-4">
                  Preferred Locations
                </label>
                <MultiSelect
                  options={locationOptions}
                  selected={selectedLocations}
                  onChange={setSelectedLocations}
                  placeholder="Select your preferred locations..."
                  maxDisplayed={3}
                />
                <p className="text-[#676F7E] text-[1.6rem] leading-[1.825rem] my-4">
                  Select all locations where you&apos;d like to work
                </p>
                <div className="flex items-center space-x-3 mt-6">
                  <Checkbox
                    id="remote-work"
                    className="h-6 w-6"
                    checked={remoteWork}
                    onCheckedChange={(checked) =>
                      setValue("remoteWork", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="remote-work"
                    className="text-[1.6rem] text-[#1F242E] cursor-pointer"
                  >
                    Open to remote work
                  </label>
                </div>
              </div>

              <div className="text-[1.597rem] mb-8">
                <label
                  className="block text-[#344054] uppercase mb-4"
                  htmlFor="country"
                >
                  Country
                </label>
                <Select onValueChange={(value) => setValue("country", value)}>
                  <SelectTrigger className="p-10! px-8! text-[1.6rem] border-[0.133rem] mt-[0.8] rounded-[0.684rem] w-full h-auto bg-white">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((country) => (
                      <SelectItem
                        className="text-[#0F1729] text-[1.6rem] py-8! px-10! bg-white hover:bg-[#F8F9FC]"
                        key={country.value}
                        value={country.value}
                      >
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[#676F7E] text-[1.6rem] leading-[1.825rem] my-4">
                  Select your country (optional)
                </p>
              </div>
              <div className="text-[1.597rem] mb-8">
                <label
                  className="block text-[#344054] uppercase mb-4"
                  htmlFor="workAuthorization"
                >
                  Work Authorization
                </label>
                <Select
                  onValueChange={(value) =>
                    setValue("workAuthorization", value as WorkAuthorization)
                  }
                >
                  <SelectTrigger className="p-10! px-8! text-[1.6rem] border-[0.133rem] mt-[0.8] rounded-[0.684rem] w-full h-auto bg-white">
                    <SelectValue placeholder="Select your work authorization status" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORK_AUTHORIZATION_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-[#0F1729] text-[1.6rem] py-8! px-10! bg-white hover:bg-[#F8F9FC]"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[#676F7E] text-[1.6rem] leading-[1.825rem] my-8">
                  This helps us show you eligible opportunities
                </p>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-degular font-semibold text-[2rem] sm:text-[3rem] lg:text-[4.106rem] leading-tight sm:leading-[4.563rem]">
                Upload your resume{" "}
              </h1>
              <p className="text-[1.4rem] sm:text-[1.6rem] lg:text-[1.825rem] text-[#676F7E] leading-relaxed mt-4 sm:mt-8 mb-8 sm:mb-12">
                Help us find the perfect match for you{" "}
              </p>

              <div className="bg-[#E7F5E1] p-4 flex items-center gap-4 rounded-2xl border border-[#E3E3E3]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 18C10.1819 18 11.3522 17.7672 12.4442 17.3149C13.5361 16.8626 14.5282 16.1997 15.364 15.364C16.1997 14.5282 16.8626 13.5361 17.3149 12.4442C17.7672 11.3522 18 10.1819 18 9C18 7.8181 17.7672 6.64778 17.3149 5.55585C16.8626 4.46392 16.1997 3.47177 15.364 2.63604C14.5282 1.80031 13.5361 1.13738 12.4442 0.685084C11.3522 0.232792 10.1819 -1.76116e-08 9 0C6.61305 3.55683e-08 4.32387 0.948211 2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9C0 11.3869 0.948212 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18ZM8.768 12.64L13.768 6.64L12.232 5.36L7.932 10.519L5.707 8.293L4.293 9.707L7.293 12.707L8.067 13.481L8.768 12.64Z"
                    fill="#03624C"
                  />
                </svg>

                <p className="text-[1.825rem]">
                  Your resume helps us match you with the best opportunities
                </p>
              </div>
              <div
                className={`h-96 sm:h-120 lg:h-[36.9rem] mt-8 border border-dashed rounded-2xl grid place-items-center text-center transition-colors bg-white ${
                  isDragOver
                    ? "border-[#03624C] bg-[#E7F5E1]"
                    : "border-[#E3E3E3]"
                }`}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="px-4">
                  <Image
                    src="/upload_icon.svg"
                    width={128}
                    height={128}
                    className="h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 mt-8 lg:mt-[5.4rem] mx-auto"
                    alt="Upload icon"
                  />
                  <h2 className="font-semibold leading-[2.281rem] mt-4 text-[1.6rem] sm:text-[1.8rem] lg:text-[2rem]">
                    {uploadedFile
                      ? `Selected: ${uploadedFile.name}`
                      : "Drop your resume here"}
                  </h2>
                  <p className="my-4">or</p>
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploadedFile(file);
                      }
                    }}
                  />
                  <label
                    htmlFor="resume"
                    className="block bg-white border border-[#E3E3E3] text-[#0F1729] max-w-[22.9rem] text-[1.6rem] sm:text-[1.8rem] w-full my-8 lg:my-12 mx-auto py-3 px-6 rounded-xl cursor-pointer hover:bg-[#F8F9FC] transition-colors text-center"
                  >
                    Browse files
                  </label>
                </div>
              </div>
            </>
          )}
          <Button
            type="submit"
            loading={submitOnboardingMutation.isPending && step === 2}
            className="block bg-[#03624C] max-w-[22.9rem] text-[1.6rem] sm:text-[1.8rem] w-full my-12 mx-auto"
          >
            {step === 1 ? "Next" : "Complete"}
          </Button>
        </section>
      </form>
    </main>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <main className="w-full max-w-[65.7rem] mx-auto text-[2rem] bg-white p-4 sm:p-8 lg:p-16">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#03624C] mx-auto mb-4"></div>
              <p className="text-[#676F7E]">Loading onboarding...</p>
            </div>
          </div>
        </main>
      }
    >
      <OnboardingForm />
    </Suspense>
  );
}
