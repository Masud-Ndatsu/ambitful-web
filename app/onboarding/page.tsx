"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useCallback, useState } from "react";
import Image from "next/image";

interface FormData {
  jobFunction: string;
  jobTypes: string[];
  location: string;
  remoteWork: boolean;
  workAuthorization: string;
  resume?: FileList;
}

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") || "1", 10);
  const [isDragOver, setIsDragOver] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      jobTypes: [],
      remoteWork: false,
    },
  });

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

  const jobTypes = watch("jobTypes");
  const resumeFile = watch("resume");

  const onSubmit = (data: FormData) => {
    console.log(data);
    if (step === 1) {
      updateStep(2);
    } else {
      // Handle final submission
      alert("Onboarding completed!");
    }
  };

  const handleJobTypeChange = (type: string, checked: boolean) => {
    const current = jobTypes || [];
    if (checked) {
      setValue("jobTypes", [...current, type]);
    } else {
      setValue(
        "jobTypes",
        current.filter((t) => t !== type)
      );
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

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        // Create a new DataTransfer to set as FileList
        const dt = new DataTransfer();
        dt.items.add(files[0]);
        setValue("resume", dt.files);
      }
    },
    [setValue]
  );

  return (
    <main className="lg:mt-[8.1rem] max-w-[65.7rem] text-[2rem] bg-[#FFFFFF] p-16">
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
              <h1 className="font-degular font-semibold text-[4.106rem] leading-[4.563rem]">
                Let's personalize your experience
              </h1>
              <p className="text-[1.825rem] leading-[2.738rem] mt-8 mb-12">
                Tell us what you're looking for
              </p>
              <div className="text-[1.597rem] mb-8">
                <label
                  className="block text-[#344054] uppercase mb-4"
                  htmlFor="jobFunction"
                >
                  Job Function
                </label>
                <input
                  type="text"
                  id="jobFunction"
                  className="py-[1.333rem] px-[1.867rem] border-[0.133rem] mt-[0.8] rounded-[0.684rem] w-full"
                  placeholder="Select your job function for best result"
                  {...register("jobFunction")}
                />
                <p className="text-[#676F7E] text-[1.6rem] leading-[1.825rem] my-8">
                  Choose the field that best matches your expertise
                </p>
              </div>
              <div className="text-[1.597rem] mb-8">
                <label
                  className="block text-[#344054] uppercase mb-4"
                  htmlFor="jobTypes"
                >
                  Job Type
                </label>
                <div className="flex justify-between">
                  {["Full-time", "Contract", "Part-time", "Internship"].map(
                    (type) => (
                      <div key={type} className="flex items-center space-x-3">
                        <Checkbox
                          id={`job-type-${type}`}
                          className="h-6 w-6"
                          checked={jobTypes?.includes(type) || false}
                          onCheckedChange={(checked) =>
                            handleJobTypeChange(type, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={`job-type-${type}`}
                          className="text-[1.597rem] text-[#1F242E] cursor-pointer"
                        >
                          {type}
                        </label>
                      </div>
                    )
                  )}
                </div>
                <div className="flex items-center space-x-3 mt-6">
                  <Checkbox
                    id="job-type-other"
                    className="h-6 w-6"
                    checked={jobTypes?.includes("Other") || false}
                    onCheckedChange={(checked) =>
                      handleJobTypeChange("Other", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="job-type-other"
                    className="text-[1.597rem] text-[#1F242E] cursor-pointer"
                  >
                    Other
                  </label>
                </div>

                <p className="text-[#676F7E] text-[1.6rem] leading-[1.825rem] my-8">
                  Select all that apply{" "}
                </p>
              </div>
              <div className="text-[1.597rem] mb-8">
                <label
                  className="block text-[#344054] uppercase mb-4"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="py-[1.333rem] px-[1.867rem] border-[0.133rem] mt-[0.8]  rounded-[0.684rem] w-full"
                  placeholder="e.g San Francisco, CA"
                  {...register("location")}
                />
                <div className="flex items-center space-x-3 mt-6">
                  <Checkbox
                    id="remote-work"
                    className="h-6 w-6"
                    checked={watch("remoteWork")}
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
                  htmlFor="workAuthorization"
                >
                  Work Authorization
                </label>
                <input
                  type="text"
                  id="workAuthorization"
                  className="py-[1.333rem] px-[1.867rem] border-[0.133rem] mt-[0.8]  rounded-[0.684rem] w-full"
                  placeholder="Select your work authorization status"
                  {...register("workAuthorization")}
                />
                <p className="text-[#676F7E] text-[1.6rem] leading-[1.825rem] my-8">
                  This helps us show you eligible opportunities{" "}
                </p>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-degular font-semibold text-[4.106rem] leading-[4.563rem]">
                Upload your resume{" "}
              </h1>
              <p className="text-[1.825rem] text-[#676F7E] leading-[2.738rem] mt-8 mb-12">
                Help us find the perfect match for you{" "}
              </p>

              <div className="bg-[#03624C1A] p-4 flex items-center gap-4 rounded-2xl">
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
                className={`h-[36.9rem] mt-8 border border-dashed rounded-2xl grid place-items-center text-center transition-colors ${
                  isDragOver
                    ? "border-[#03624C] bg-[#03624C1A]"
                    : "border-gray-300"
                }`}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Image
                  src="/upload_icon.svg"
                  width={128}
                  height={128}
                  className="h-32 w-32 mt-[5.4rem] mx-auto"
                  alt="Upload icon"
                />
                <h2 className="font-semibold leading-[2.281rem]">
                  {resumeFile && resumeFile.length > 0
                    ? `Selected: ${resumeFile[0].name}`
                    : "Drop your resume here"}
                </h2>
                <p>or</p>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  {...register("resume")}
                />
                <label
                  htmlFor="resume"
                  className="block bg-white border border-[#E3E3E3] text-black max-w-[22.9rem] text-[1.8rem] w-full my-12 mx-auto py-3 px-6 rounded-md cursor-pointer hover:bg-gray-50 transition-colors text-center"
                >
                  Browse files
                </label>
              </div>
            </>
          )}
          <Button
            type="submit"
            className="block bg-[#03624C] max-w-[22.9rem] text-[1.8rem] w-full my-12 mx-auto"
          >
            {step === 1 ? "Next" : "Complete"}
          </Button>
        </section>
      </form>
    </main>
  );
}
